import { getMinioClient, MINIO_BUCKET, MINIO_PREFIX } from '../lib/minio';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

async function main() {
    const client = getMinioClient();
    const jobId = '70cc9ba5-6aab-42eb-b547-bfa091976da0';
    const objectPath = `${MINIO_PREFIX}/pdfs/sheet_${jobId}.pdf`;

    try {
        const url = await client.presignedGetObject(MINIO_BUCKET, objectPath, 24 * 60 * 60);
        console.log('--- URL_VALIDADA ---');
        console.log(url);
    } catch (err) {
        console.error(err);
    }
}
main();
