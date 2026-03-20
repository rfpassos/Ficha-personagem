import { getMinioClient, MINIO_BUCKET } from '../lib/minio';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

async function main() {
    const client = getMinioClient();
    console.log(`Listando objetos no bucket: ${MINIO_BUCKET}`);

    const stream = client.listObjectsV2(MINIO_BUCKET, '', true);
    
    stream.on('data', (obj) => {
        console.log(`- ${obj.name} (${obj.size} bytes)`);
    });

    stream.on('error', (err) => {
        console.error('Erro:', err);
    });

    stream.on('end', () => {
        console.log('Listagem concluída.');
    });
}
main();
