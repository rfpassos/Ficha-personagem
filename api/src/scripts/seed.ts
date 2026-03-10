import 'dotenv/config';
import { prisma } from '../lib/db';

async function seed(): Promise<void> {
    console.log('🌱 Iniciando seed do banco de dados...');

    const settings = [
        { key: 'fallback_image_url', value: '' },
        { key: 'rate_limit_global', value: '10' },
        { key: 'gemini_timeout_ms', value: '30000' },
        { key: 'freepik_polling_interval_ms', value: '2000' },
        { key: 'freepik_polling_timeout_ms', value: '30000' },
        { key: 'minio_bucket', value: process.env.MINIO_BUCKET ?? 'maestro.loopstudio' },
        { key: 'system_version', value: '1.0.0' },
    ];

    for (const s of settings) {
        await prisma.setting.upsert({
            where: { key: s.key },
            update: { value: s.value },
            create: { key: s.key, value: s.value },
        });
        console.log(`  ✓ Setting: ${s.key}`);
    }

    console.log('\n✅ Seed concluído!');
    await prisma.$disconnect();
}

seed().catch((err) => {
    console.error('Erro no seed:', err);
    process.exit(1);
});

