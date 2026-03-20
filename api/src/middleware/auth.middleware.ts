import { createHash } from 'crypto';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/db';

export async function authMiddleware(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> {
    const apiKey = (request.headers['x-api-key'] || (request.query as any)['x-api-key']) as string | undefined;

    if (!apiKey || typeof apiKey !== 'string') {
        reply.status(401).send({ error: 'Missing X-API-Key (header or query param)' });
        return;
    }

    const prefix = apiKey.substring(0, 12);
    const keyHash = createHash('sha256').update(apiKey).digest('hex');

    console.log(`[DEBUG_AUTH] Prefix: ${prefix}, Hash: ${keyHash}`);

    const record = await prisma.apiKey.findFirst({
        where: { keyPrefix: prefix, keyHash, isActive: true },
    });

    if (!record) {
        console.log(`[DEBUG_AUTH] No record found for Prefix: ${prefix}`);
        reply.status(401).send({ error: 'Invalid or inactive API Key' });
        return;
    }

    // Atualiza uso em background (não bloqueia a resposta)
    prisma.apiKey.update({
        where: { id: record.id },
        data: {
            lastUsedAt: new Date(),
            usageCount: { increment: 1 },
        },
    }).catch(() => { /* silencioso — não crítico */ });

    // Anexa dados da key à requisição para uso na rota
    (request as FastifyRequest & { apiKeyRecord: typeof record }).apiKeyRecord = record;
}

export async function adminAuthMiddleware(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> {
    const secret = request.headers['x-admin-secret'] as string | undefined;

    if (!secret || secret !== process.env.ADMIN_SECRET) {
        reply.status(401).send({ error: 'Unauthorized' });
        return;
    }
}

