import dotenv from 'dotenv';
import path from 'path';

// Carrega o .env da raiz do projeto
dotenv.config({ path: path.join(__dirname, '../../.env') });
import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { sheetRoutes } from './routes/sheet.route';
import { adminRoutes } from './routes/admin.route';

async function main(): Promise<void> {
    const app = Fastify({
        logger: {
            level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
            transport: process.env.NODE_ENV !== 'production'
                ? { target: 'pino-pretty', options: { colorize: true } }
                : undefined,
        },
        bodyLimit: 1048576, // 1MB
        requestTimeout: 65000, // 65s (maior que o timeout da geração)
    });

    // ── Plugins ──────────────────────────────────────────────
    await app.register(cors, {
        origin: process.env.CORS_ORIGIN ?? '*',
    });

    await app.register(rateLimit, {
        max: parseInt(process.env.RATE_LIMIT_MAX ?? '10'),
        timeWindow: parseInt(process.env.RATE_LIMIT_WINDOW ?? '60000'),
    });

    // ── Health check ─────────────────────────────────────────
    app.get('/health', async () => ({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version ?? '1.0.0',
    }));

    // ── Rotas ─────────────────────────────────────────────────
    await app.register(sheetRoutes);
    await app.register(adminRoutes, { prefix: '/admin' });

    // ── Start ─────────────────────────────────────────────────
    const port = parseInt(process.env.PORT ?? '3000');
    const host = '0.0.0.0';

    try {
        await app.listen({ port, host });
        console.log(`✅ API running on http://${host}:${port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
});
