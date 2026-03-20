import { prisma } from '../lib/db';
import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

async function main() {
    try {
        const apiKey = 'rgs_final_test_key_2025'; // 12+ chars
        const prefix = apiKey.substring(0, 12);
        const keyHash = createHash('sha256').update(apiKey).digest('hex');

        // Upsert via Prisma para garantir que o registro exista
        await prisma.apiKey.upsert({
            where: { keyPrefix: prefix },
            update: { keyHash, isActive: true, name: 'Final Test Key' },
            create: {
                id: uuidv4(),
                keyPrefix: prefix,
                keyHash: keyHash,
                name: 'Final Test Key',
                isActive: true
            }
        });

        console.log('--- KEY_READY_VIA_PRISMA ---');
        console.log(`API_KEY=${apiKey}`);
    } catch (err: any) {
        console.error('Erro no Prisma:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
