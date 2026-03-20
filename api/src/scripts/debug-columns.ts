import { Client } from 'pg';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

async function main() {
    const connectionString = process.env.DATABASE_URL;
    const client = new Client({ connectionString });
    
    try {
        await client.connect();
        const r = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'api_keys'");
        console.log('COLUMNS:', r.rows.map(r => r.column_name));
    } catch (err: any) {
        console.error('Erro:', err.message);
    } finally {
        await client.end();
    }
}

main();
