import { createHash } from 'crypto';
import { Client } from 'pg';
import path from 'path';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

async function main() {
    const connectionString = process.env.DATABASE_URL;
    const client = new Client({ connectionString });
    
    try {
        await client.connect();
        
        // Chave de teste: 12 caracteres para o prefixo + corpo
        const apiKey = 'rgs_validation_test_key_2025'; 
        const prefix = apiKey.substring(0, 12);
        const keyHash = createHash('sha256').update(apiKey).digest('hex');

        // Limpa registros anteriores para evitar conflitos de Unique
        await client.query('DELETE FROM api_keys WHERE name = \'Test Final Validation\'');
        
        // Insere a nova chave usando os nomes EXATOS das colunas (camelCase no banco conforme debug-columns)
        await client.query(
            'INSERT INTO api_keys ("id", "name", "keyPrefix", "keyHash", "isActive", "createdAt") VALUES ($1, $2, $3, $4, $5, NOW())',
            [uuidv4(), 'Test Final Validation', prefix, keyHash, true]
        );

        console.log('--- KEY_REGENERATED_SUCCESS ---');
        console.log(`API_KEY=${apiKey}`);

    } catch (err: any) {
        console.error('Erro:', err.message);
    } finally {
        await client.end();
    }
}

main();
