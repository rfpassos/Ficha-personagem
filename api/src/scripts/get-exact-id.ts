import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

async function main() {
    const ENV_PATH = path.resolve(__dirname, '../../../.env');
    const envContent = fs.readFileSync(ENV_PATH, 'utf8');
    const dbUrlMatch = envContent.match(/DATABASE_URL=(.+?)(\r?\n|$)/);
    const connectionString = dbUrlMatch![1].trim().replace(/^"(.*)"$/, '$1');

    const client = new Client({ connectionString });

    try {
        await client.connect();
        const res = await client.query('SELECT id FROM generations WHERE status = \'SUCCESS\' ORDER BY "createdAt" DESC LIMIT 1');
        if (res.rows.length > 0) {
            console.log(`CORRECT_ID:${res.rows[0].id}`);
        } else {
            console.log('NO_SUCCESS_FOUND');
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}
main();
