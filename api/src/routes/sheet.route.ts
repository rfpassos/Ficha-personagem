import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { characterSchema } from '../schemas/character.schema';
import type { CharacterInput } from '../types/character.types';
import { authMiddleware } from '../middleware/auth.middleware';
import { generateCharacterPrompt } from '../services/prompt.service';
import { generateCharacterImage } from '../services/image.service';
import { renderSheetHtml } from '../services/template.service';
import { generatePdfFromHtml } from '../services/pdf.service';
import { uploadImageToMinio, MINIO_BUCKET, MINIO_PREFIX } from '../lib/minio';
import { prisma } from '../lib/db';

export async function sheetRoutes(app: FastifyInstance): Promise<void> {
    app.post<{ Body: CharacterInput }>(
        '/api/generate-sheet',
        {
            schema: { body: characterSchema },
            preHandler: [authMiddleware],
        },
        async (request, reply) => {
            const character = request.body;
            const apiKeyRecord = (request as typeof request & { apiKeyRecord: { id: string } }).apiKeyRecord;
            const startTime = Date.now();

            // Cria log de geração (status PENDING)
            const generation = await prisma.generation.create({
                data: {
                    apiKeyId: apiKeyRecord.id,
                    characterName: character.nome,
                    characterRace: character.raca,
                    characterClass: character.classe,
                    status: 'PENDING',
                },
            });

            try {
                // 1. Gera prompt descritivo
                const imagePrompt = await generateCharacterPrompt(character);

                // 2. Gera imagem (cascata Gemini → Freepik → placeholder)
                const { base64: imageBase64, source } = await generateCharacterImage(imagePrompt);

                // 3. Salva imagem no MinIO em background
                let imageUrl: string | undefined;
                try {
                    const imgBuffer = Buffer.from(imageBase64, 'base64');
                    const objectName = `${generation.id}.png`;
                    await uploadImageToMinio(objectName, imgBuffer);
                    imageUrl = `${MINIO_PREFIX}/images/${objectName}`;
                } catch (minioErr) {
                    console.warn('[sheet.route] MinIO upload failed:', (minioErr as Error).message);
                }

                // 4. Renderiza HTML e gera PDF
                const html = renderSheetHtml(character, imageBase64);
                const pdfBuffer = await generatePdfFromHtml(html);
                const durationMs = Date.now() - startTime;

                // 5. Atualiza log de geração
                await prisma.generation.update({
                    where: { id: generation.id },
                    data: {
                        status: 'SUCCESS',
                        imageSource: source,
                        imageUrl,
                        pdfSizeBytes: pdfBuffer.length,
                        durationMs,
                    },
                });

                // 6. Retorna PDF
                const filename = `ficha-${character.nome.replace(/\s+/g, '-').toLowerCase()}.pdf`;
                reply
                    .header('Content-Type', 'application/pdf')
                    .header('Content-Disposition', `attachment; filename="${filename}"`)
                    .header('Content-Length', pdfBuffer.length)
                    .send(pdfBuffer);
            } catch (err) {
                const durationMs = Date.now() - startTime;
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';

                await prisma.generation.update({
                    where: { id: generation.id },
                    data: { status: 'ERROR', errorMessage, durationMs },
                }).catch(() => { });

                request.log.error({ err }, 'Sheet generation failed');
                reply.status(500).send({ error: 'Internal server error', details: errorMessage });
            }
        }
    );
}

