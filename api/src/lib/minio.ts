import { Client } from 'minio';

let client: Client | null = null;

export function getMinioClient(): Client {
    if (!client) {
        if (!process.env.MINIO_ENDPOINT) {
            throw new Error('MINIO_ENDPOINT is not defined in environment variables');
        }
        client = new Client({
            endPoint: process.env.MINIO_ENDPOINT!,
            port: parseInt(process.env.MINIO_PORT ?? '443'),
            useSSL: process.env.MINIO_USE_SSL === 'true',
            accessKey: process.env.MINIO_ACCESS_KEY!,
            secretKey: process.env.MINIO_SECRET_KEY!,
        });
    }
    return client;
}

export const MINIO_BUCKET = process.env.MINIO_BUCKET || '';
export const MINIO_PREFIX = 'rpgsheet';

export async function uploadImageToMinio(
    objectName: string,
    buffer: Buffer,
    contentType = 'image/png'
): Promise<string> {
    const fullPath = `${MINIO_PREFIX}/images/${objectName}`;
    await getMinioClient().putObject(MINIO_BUCKET, fullPath, buffer, buffer.length, {
        'Content-Type': contentType,
    });
    return fullPath;
}

export async function getFallbackImageBuffer(): Promise<Buffer> {
    const path = `${MINIO_PREFIX}/images/fallback/image-error.png`;
    try {
        const stream = await getMinioClient().getObject(MINIO_BUCKET, path);
        return new Promise<Buffer>((resolve, reject) => {
            const chunks: Buffer[] = [];
            stream.on('data', (chunk: Buffer) => chunks.push(chunk));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
            stream.on('error', reject);
        });
    } catch {
        // Se MinIO falhar, usa arquivo local de fallback
        const fs = await import('fs/promises');
        const path_mod = await import('path');
        // Caminho ajustado para a raiz do projeto (ou pasta assets da API)
        const localFallback = path_mod.resolve(__dirname, '../../../assets/image-error.png');
        return fs.readFile(localFallback);
    }
}
