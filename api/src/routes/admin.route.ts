import type { FastifyInstance } from 'fastify';
import { adminAuthMiddleware } from '../middleware/auth.middleware';
import { prisma } from '../lib/db';
import { createHash, randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export async function adminRoutes(app: FastifyInstance): Promise<void> {
    // Aplica auth de admin em todas as rotas deste plugin
    app.addHook('preHandler', adminAuthMiddleware);

    // ── GET /admin/api-keys ─────────────────────────────────
    app.get('/api-keys', async () => {
        const keys = await prisma.apiKey.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                keyPrefix: true,
                name: true,
                isActive: true,
                rateLimit: true,
                createdAt: true,
                lastUsedAt: true,
                usageCount: true,
            },
        });
        return { data: keys };
    });

    // ── POST /admin/api-keys ────────────────────────────────
    app.post<{ Body: { name: string; rateLimit?: number } }>(
        '/api-keys',
        { schema: { body: { type: 'object', required: ['name'], properties: { name: { type: 'string' }, rateLimit: { type: 'number' } } } } },
        async (request, reply) => {
            const { name, rateLimit = 10 } = request.body;

            // Gera chave: formato rgs_<random 48 bytes hex>
            const rawKey = `rgs_${randomBytes(24).toString('hex')}`;
            const keyPrefix = rawKey.substring(0, 12);
            const keyHash = createHash('sha256').update(rawKey).digest('hex');

            const record = await prisma.apiKey.create({
                data: { id: uuidv4(), keyPrefix, keyHash, name, rateLimit },
            });

            // Retorna a chave em plain text UMA VEZ APENAS
            reply.status(201).send({
                message: 'API Key created. Save this key — it will not be shown again.',
                apiKey: rawKey,
                id: record.id,
                prefix: keyPrefix,
                name: record.name,
            });
        }
    );

    // ── PATCH /admin/api-keys/:id ───────────────────────────
    app.patch<{ Params: { id: string }; Body: { isActive?: boolean; rateLimit?: number; name?: string } }>(
        '/api-keys/:id',
        async (request, reply) => {
            const { id } = request.params;
            const { isActive, rateLimit, name } = request.body;

            const updated = await prisma.apiKey.update({
                where: { id },
                data: { ...(isActive !== undefined && { isActive }), ...(rateLimit && { rateLimit }), ...(name && { name }) },
            }).catch(() => null);

            if (!updated) return reply.status(404).send({ error: 'API Key not found' });
            return { data: { id: updated.id, name: updated.name, isActive: updated.isActive } };
        }
    );

    // ── DELETE /admin/api-keys/:id ──────────────────────────
    app.delete<{ Params: { id: string } }>(
        '/api-keys/:id',
        async (request, reply) => {
            const { id } = request.params;
            await prisma.apiKey.delete({ where: { id } }).catch(() => null);
            reply.status(204).send();
        }
    );

    // ── GET /admin/generations ──────────────────────────────
    app.get<{ Querystring: { page?: string; status?: string } }>(
        '/generations',
        async (request) => {
            const page = Math.max(1, parseInt(request.query.page ?? '1'));
            const take = 20;

            const where = request.query.status
                ? { status: request.query.status as 'SUCCESS' | 'ERROR' | 'PENDING' }
                : {};

            const [items, total] = await Promise.all([
                prisma.generation.findMany({
                    where,
                    orderBy: { createdAt: 'desc' },
                    skip: (page - 1) * take,
                    take,
                    include: { apiKey: { select: { name: true, keyPrefix: true } } },
                }),
                prisma.generation.count({ where }),
            ]);

            return { data: items, meta: { page, total, pages: Math.ceil(total / take) } };
        }
    );

    // ── GET /admin/settings ─────────────────────────────────
    app.get('/settings', async () => {
        const settings = await prisma.setting.findMany();
        return { data: Object.fromEntries(settings.map((s: { key: string; value: string }) => [s.key, s.value])) };
    });

    // ── PATCH /admin/settings ───────────────────────────────
    app.patch<{ Body: Record<string, string> }>(
        '/settings',
        async (request) => {
            const updates = Object.entries(request.body);
            await Promise.all(
                updates.map(([key, value]) =>
                    prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } })
                )
            );
            return { message: 'Settings updated', updated: updates.length };
        }
    );
}

