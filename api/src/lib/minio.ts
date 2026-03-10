import { Client } from 'minio';

export const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT!,
    port: parseInt(process.env.MINIO_PORT ?? '443'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY!,
    secretKey: process.env.MINIO_SECRET_KEY!,
});

export const MINIO_BUCKET = process.env.MINIO_BUCKET!;
export const MINIO_PREFIX = 'rpgsheet';

export async function uploadImageToMinio(
    objectName: string,
    buffer: Buffer,
    contentType = 'image/png'
): Promise<string> {
    const fullPath = `${MINIO_PREFIX}/images/${objectName}`;
    await minioClient.putObject(MINIO_BUCKET, fullPath, buffer, buffer.length, {
        'Content-Type': contentType,
    });
    return fullPath;
}

export async function getFallbackImageBuffer(): Promise<Buffer> {
    const path = `${MINIO_PREFIX}/images/fallback/image-error.png`;
    try {
        const stream = await minioClient.getObject(MINIO_BUCKET, path);
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
        const localFallback = path_mod.join(__dirname, '..', 'assets', 'image-error.png');
        return fs.readFile(localFallback);
    }
}
