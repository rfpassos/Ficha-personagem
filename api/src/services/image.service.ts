import { googleImage } from './google-api.service';
import { getFallbackImageBuffer } from '../lib/minio';

export type ImageSource = 'GEMINI' | 'FREEPIK' | 'PLACEHOLDER';

export interface ImageResult {
    base64: string;
    source: ImageSource;
}

// ── 1. Gemini Image Generation (REST) ────────────────────────
async function generateWithGeminiRest(prompt: string): Promise<string> {
    console.log('[image.service] Gerando imagem com gemini-3.1-flash-image-preview (REST)...');
    
    return await googleImage('gemini-3.1-flash-image-preview', prompt, {
        thinking_config: {
            include_thoughts: true,
            thinking_level: "MINIMAL"
        }
    });
}

// ── 2. Freepik API (Fallback) ──────────────────────────────
async function generateWithFreepikInternal(prompt: string, aspectRatio: string): Promise<string> {
    const POLLING_INTERVAL = parseInt(process.env.FREEPIK_POLLING_INTERVAL_MS ?? '2000');
    const POLLING_TIMEOUT = parseInt(process.env.FREEPIK_POLLING_TIMEOUT_MS ?? '30000');

    console.log('[image.service] Chamando Freepik Mystic...');
    const submitRes = await fetch('https://api.freepik.com/v1/ai/mystic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-freepik-api-key': process.env.FREEPIK_API_KEY!,
        },
        body: JSON.stringify({
            prompt,
            resolution: '2k',
            aspect_ratio: aspectRatio === 'portrait_4_5' ? 'portrait_4_5' : 'portrait_3_4',
            model: 'realism',
            filter_nsfw: true,
            engine: 'automatic',
        }),
    });

    if (!submitRes.ok) {
        throw new Error(`Freepik submit failed: ${submitRes.status}`);
    }

    const { data } = await submitRes.json() as { data: { task_id: string; status: string } };
    const taskId = data.task_id;
    const deadline = Date.now() + POLLING_TIMEOUT;

    while (Date.now() < deadline) {
        await new Promise(r => setTimeout(r, POLLING_INTERVAL));
        const statusRes = await fetch(`https://api.freepik.com/v1/ai/mystic/${taskId}`, {
            headers: { 'x-freepik-api-key': process.env.FREEPIK_API_KEY! },
        });
        if (!statusRes.ok) continue;
        const statusData = await statusRes.json() as any;
        if (statusData.data.status === 'COMPLETED') {
            const generated = statusData.data.generated?.[0];
            if (generated?.base64) return generated.base64;
            if (generated?.url) {
                const imgRes = await fetch(generated.url);
                const buf = Buffer.from(await imgRes.arrayBuffer());
                return buf.toString('base64');
            }
        }
        if (statusData.data.status === 'FAILED') throw new Error('Freepik task failed');
    }
    throw new Error('Freepik polling timeout');
}

// ── 3. Fallback local / MinIO ──────────────────────────────
async function getFallbackBase64(): Promise<string> {
    const buffer = await getFallbackImageBuffer();
    return buffer.toString('base64');
}

// ── Cascata principal ──────────────────────────────────────
export async function generateImage(prompt: string, options: { aspect_ratio?: string } = {}): Promise<ImageResult> {
    const aspectRatio = options.aspect_ratio || 'portrait_3_4';

    // Tentativa 1: Gemini (REST 3.1)
    try {
        const base64 = await generateWithGeminiRest(prompt);
        return { base64, source: 'GEMINI' };
    } catch (err: any) {
        console.warn('[image.service] Gemini REST failed:', err.message);
    }

    // Tentativa 2: Freepik
    try {
        const base64 = await generateWithFreepikInternal(prompt, aspectRatio);
        return { base64, source: 'FREEPIK' };
    } catch (err: any) {
        console.warn('[image.service] Freepik failed:', err.message);
    }

    // Fallback final: imagem de erro
    console.warn('[image.service] Using placeholder image');
    const base64 = await getFallbackBase64();
    return { base64, source: 'PLACEHOLDER' };
}

export const generateCharacterImage = (prompt: string) => generateImage(prompt);
