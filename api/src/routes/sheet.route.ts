import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { sheetRequestSchema } from '../schemas/sheet-request.schema';
import { authMiddleware } from '../middleware/auth.middleware';
import { prisma } from '../lib/db';
import { LLMParserService } from '../services/parser.service';
import { generateCharacterPrompt } from '../services/prompt.service';
import { generateCharacterImage } from '../services/image.service';
import { renderSheetHtml } from '../services/template.service';
import { generatePdfFromHtml } from '../services/pdf.service';
import { StorageService } from '../services/storage.service';

export async function sheetRoutes(app: FastifyInstance): Promise<void> {
    
    // 1. POST /api/v1/sheets - Inicia o Job
    app.post(
        '/api/v1/sheets',
        { preHandler: [authMiddleware] },
        async (request, reply) => {
            const body = sheetRequestSchema.parse(request.body);
            const apiKeyRecord = (request as any).apiKeyRecord;

            // Cria o registro na DB como PENDING
            const generation = await prisma.generation.create({
                data: {
                    apiKeyId: apiKeyRecord.id,
                    characterName: 'Processando...', // Será atualizado após o parse
                    status: 'PENDING',
                },
            });

            // Inicia o processamento em background (não bloqueia o HTTP)
            processInBackground(generation.id, body, request.log);

            return reply.status(202).send({
                jobId: generation.id,
                status: 'PENDING',
                links: {
                    status: `/api/v1/sheets/${generation.id}`,
                    download: `/api/v1/sheets/${generation.id}/download`
                }
            });
        }
    );

    // 2. GET /api/v1/sheets/:id/download - Proxy Seguro de Download [NOVO]
    app.get<{ Params: { id: string } }>(
        '/api/v1/sheets/:id/download',
        { preHandler: [authMiddleware] },
        async (request, reply) => {
            const { id } = request.params;

            const job = await prisma.generation.findUnique({
                where: { id }
            });

            if (!job || job.status !== 'SUCCESS' || !job.pdfPath) {
                return reply.status(404).send({ error: 'Arquivo não disponível ou ficha ainda em processamento' });
            }

            try {
                const stream = await StorageService.getObject(job.pdfPath);
                
                reply.header('Content-Type', 'application/pdf');
                reply.header('Content-Disposition', `attachment; filename="ficha_${job.characterName || id}.pdf"`);
                
                return reply.send(stream);
            } catch (err) {
                request.log.error({ err, jobId: id }, 'Erro ao buscar arquivo no MinIO');
                return reply.status(500).send({ error: 'Erro ao recuperar o arquivo.' });
            }
        }
    );

    // 2. GET /api/v1/sheets/:id - Poll Status
    app.get<{ Params: { id: string } }>(
        '/api/v1/sheets/:id',
        { preHandler: [authMiddleware] },
        async (request, reply) => {
            const { id } = request.params;

            const job = await prisma.generation.findUnique({
                where: { id },
                include: { apiKey: { select: { name: true } } }
            });

            if (!job) {
                return reply.status(404).send({ error: 'Job não encontrado' });
            }

            // Se concluído, retornamos a URL do nosso próprio endpoint de download
            const downloadUrl = job.status === 'SUCCESS' 
                ? `/api/v1/sheets/${job.id}/download`
                : null;

            return {
                jobId: job.id,
                status: job.status,
                character: job.characterName,
                progress: job.status === 'PENDING' ? 'Na fila' : (job.status === 'SUCCESS' ? 'Concluído' : 'Erro'),
                downloadUrl,
                error: job.status === 'ERROR' ? job.errorMessage : null,
                createdAt: job.createdAt
            };
        }
    );
}

/**
 * Lógica pesada executada em background
 */
async function processInBackground(jobId: string, input: any, log: any) {
    const startTime = Date.now();
    
    try {
        // 1. Parse via IA (LLMParserService)
        log.info({ jobId }, 'Iniciando Parse IA');
        const character = input.contentType === 'markdown' || typeof input.content === 'string' 
            ? await LLMParserService.parseToCharacter(input.content)
            : input.content;

        await prisma.generation.update({
            where: { id: jobId },
            data: { 
                characterName: character.character_name,
                characterRace: character.race,
                characterClass: character.class,
                status: 'PENDING'
            }
        });

        // 2. Imagem
        log.info({ jobId }, 'Gerando Imagem');
        const imagePrompt = await generateCharacterPrompt(character);
        const { base64: imageBase64, source } = await generateCharacterImage(imagePrompt);
        
        // Upload imagem para MinIO
        const imgBuffer = Buffer.from(imageBase64, 'base64');
        const imageUrl = await StorageService.uploadCharacterImage(jobId, imgBuffer);

        // 3. PDF
        log.info({ jobId }, 'Gerando PDF');
        const html = renderSheetHtml(character, imageBase64);
        const pdfBuffer = await generatePdfFromHtml(html, { landscape: true, margin: { top: '0', right: '0', bottom: '0', left: '0' }});
        
        // Upload PDF para MinIO
        const pdfPath = await StorageService.uploadSheetPdf(jobId, pdfBuffer);

        const durationMs = Date.now() - startTime;

        // 4. Finaliza com Sucesso
        await prisma.generation.update({
            where: { id: jobId },
            data: {
                status: 'SUCCESS',
                imageSource: source,
                imageUrl, // Caminho relativo no bucket
                pdfPath, // NOVO: Salvando o caminho completo do PDF
                pdfSizeBytes: pdfBuffer.length,
                durationMs,
            },
        });
        log.info({ jobId }, 'Job concluído com sucesso');

    } catch (err: any) {
        log.error({ jobId, err: err.message }, 'Falha no processamento do Job');
        const durationMs = Date.now() - startTime;
        
        // Mensagem tratada para o usuário, nunca o erro real bruto
        const friendlyError = "Erro na geração da ficha. Por favor, tente novamente mais tarde.";
        
        await prisma.generation.update({
            where: { id: jobId },
            data: { 
                status: 'ERROR', 
                errorMessage: friendlyError, 
                durationMs 
            },
        }).catch(() => {});
    }
}
