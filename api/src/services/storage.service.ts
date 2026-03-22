import { getMinioClient, MINIO_BUCKET, MINIO_PREFIX } from '../lib/minio';
import { Readable } from 'stream';

let bucketExistsChecked = false;


export class StorageService {
    /**
     * Faz upload de um Buffer ou Stream para o MinIO
     */
    static async upload(path: string, content: Buffer | Readable | string, contentType: string): Promise<string> {
        const client = getMinioClient();
        await this.ensureBucketExists(client);
        const fullPath = `${MINIO_PREFIX}/${path}`;


        const metaData = {
            'Content-Type': contentType,
        };

        if (content instanceof Buffer) {
            await client.putObject(MINIO_BUCKET, fullPath, content, content.length, metaData);
        } else if (typeof content === 'string') {
            const buffer = Buffer.from(content);
            await client.putObject(MINIO_BUCKET, fullPath, buffer, buffer.length, metaData);
        } else {
            // Para Streams no minio v7+, o tamanho é opcional ou definido como 0 para stream-based
            await client.putObject(MINIO_BUCKET, fullPath, content as Readable, undefined, metaData);
        }

        return fullPath;
    }

    /**
     * Faz upload de uma imagem do personagem
     */
    static async uploadCharacterImage(jobId: string, buffer: Buffer): Promise<string> {
        return this.upload(`images/character_${jobId}.png`, buffer, 'image/png');
    }

    /**
     * Faz upload do PDF final da ficha
     */
    static async uploadSheetPdf(jobId: string, buffer: Buffer): Promise<string> {
        return this.upload(`pdfs/sheet_${jobId}.pdf`, buffer, 'application/pdf');
    }

    /**
     * Faz upload da arte de grimório para MinIO
     */
    static async uploadSpellArt(fileName: string, buffer: Buffer, contentType: string): Promise<string> {
        const client = getMinioClient();
        await this.ensureBucketExists(client);
        const fullPath = `grimorio/DnD/${fileName}`;
        await client.putObject(MINIO_BUCKET, fullPath, buffer, buffer.length, { 'Content-Type': contentType });
        return fullPath;
    }

    /**
     * Tenta puxar a arte do grimório do MinIO como Buffer
     */
    static async getSpellArtBuffer(fileName: string): Promise<Buffer | null> {
        const client = getMinioClient();
        try {
            const stream = await client.getObject(MINIO_BUCKET, `grimorio/DnD/${fileName}`);
            return new Promise<Buffer>((resolve, reject) => {
                const chunks: Buffer[] = [];
                stream.on('data', (chunk: Buffer) => chunks.push(chunk));
                stream.on('end', () => resolve(Buffer.concat(chunks)));
                stream.on('error', reject);
            });
        } catch (e: any) {
            // Se erro for NoSuchKey ou similar, retorna null
            return null;
        }
    }

    /**
     * Obtém um stream de leitura de um objeto do MinIO
     */
    static async getObject(path: string): Promise<Readable> {
        const client = getMinioClient();
        return client.getObject(MINIO_BUCKET, path);
    }

    /**
     * Remove um objeto do MinIO
     */
    static async delete(path: string): Promise<void> {
        const client = getMinioClient();
        await client.removeObject(MINIO_BUCKET, `${MINIO_PREFIX}/${path}`);
    }

    /**
     * Lista objetos com um prefixo e remove os que expiraram
     */
    static async deleteOldFiles(days: number): Promise<number> {
        const client = getMinioClient();
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() - days);

        let count = 0;
        const objectsStream = client.listObjectsV2(MINIO_BUCKET, MINIO_PREFIX, true);

        return new Promise((resolve, reject) => {
            const deletePromises: Promise<void>[] = [];

            objectsStream.on('data', (obj) => {
                if (obj.lastModified && obj.lastModified < expirationDate) {
                    deletePromises.push(
                        client.removeObject(MINIO_BUCKET, obj.name).then(() => {
                            count++;
                        })
                    );
                }
            });

            objectsStream.on('error', reject);
            objectsStream.on('end', async () => {
                await Promise.all(deletePromises);
                resolve(count);
            });
        });
    }

    /**
     * Gera uma URL presignada para download (válida por 24h)
     */
    static async getPresignedUrl(path: string): Promise<string> {
        const client = getMinioClient();
        await this.ensureBucketExists(client);
        return client.presignedGetObject(MINIO_BUCKET, `${MINIO_PREFIX}/${path}`, 24 * 60 * 60);
    }

    /**
     * Garante que o bucket existe no MinIO
     */
    private static async ensureBucketExists(client: any): Promise<void> {
        if (bucketExistsChecked) return;

        try {
            const exists = await client.bucketExists(MINIO_BUCKET);
            if (!exists) {
                console.log(`[Storage] Bucket ${MINIO_BUCKET} não encontrado. Criando...`);
                await client.makeBucket(MINIO_BUCKET, 'us-east-1');
            }
            bucketExistsChecked = true;
        } catch (err) {
            console.error('[Storage] Erro ao verificar/criar bucket:', err);
            // Não bloqueamos aqui, pois o erro pode ser de permissão mas o bucket já existir
        }
    }

}
