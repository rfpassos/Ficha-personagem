#!/usr/bin/env ts-node
/**
 * CLI para gerar API Keys sem precisar do painel Admin.
 * Uso: npx ts-node src/scripts/generate-key.ts --name "Nome da Chave"
 */
import 'dotenv/config';
import { createHash, randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../lib/db';

async function main(): Promise<void> {
    const args = process.argv.slice(2);
    const nameIndex = args.indexOf('--name');

    if (nameIndex === -1 || !args[nameIndex + 1]) {
        console.error('Usage: npx ts-node src/scripts/generate-key.ts --name "Nome da Chave"');
        process.exit(1);
    }

    const name = args[nameIndex + 1];
    const rawKey = `rgs_${randomBytes(24).toString('hex')}`;
    const keyPrefix = rawKey.substring(0, 12);
    const keyHash = createHash('sha256').update(rawKey).digest('hex');

    const record = await prisma.apiKey.create({
        data: { id: uuidv4(), keyPrefix, keyHash, name, rateLimit: 10 },
    });

    console.log('\n✅ API Key criada com sucesso!');
    console.log('──────────────────────────────────────────');
    console.log(`  ID:     ${record.id}`);
    console.log(`  Nome:   ${record.name}`);
    console.log(`  Prefix: ${keyPrefix}`);
    console.log(`\n  🔑 API KEY: ${rawKey}`);
    console.log('\n  ⚠️  Salve esta chave agora! Ela não será exibida novamente.');
    console.log('── ────────────────────────────────────────\n');

    await prisma.$disconnect();
}

main().catch((err) => {
    console.error('Erro ao criar API Key:', err);
    process.exit(1);
});

