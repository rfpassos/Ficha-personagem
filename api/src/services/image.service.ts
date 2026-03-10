import { GoogleGenerativeAI } from '@google/generative-ai';
import { getFallbackImageBuffer } from '../lib/minio';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export type ImageSource = 'GEMINI' | 'FREEPIK' | 'PLACEHOLDER';

export interface ImageResult {
    base64: string;
    source: ImageSource;
}

// ── 1. Gemini Image Generation ─────────────────────────────
async function generateWithGemini(prompt: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp-image-generation' });

    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
            // @ts-expect-error - responseModalities is supported at runtime
            responseModalities: ['IMAGE'],
        },
    });

    const parts = result.response.candidates?.[0]?.content?.parts ?? [];
    for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
            return part.inlineData.data; // base64
        }
    }
    throw new Error('Gemini did not return an image');
}

// ── 2. Freepik Mystic API (async + polling) ────────────────
async function generateWithFreepik(prompt: string): Promise<string> {
    const POLLING_INTERVAL = parseInt(process.env.FREEPIK_POLLING_INTERVAL_MS ?? '2000');
    const POLLING_TIMEOUT = parseInt(process.env.FREEPIK_POLLING_TIMEOUT_MS ?? '30000');

    // Submete a tarefa
    const submitRes = await fetch('https://api.freepik.com/v1/ai/mystic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-freepik-api-key': process.env.FREEPIK_API_KEY!,
        },
        body: JSON.stringify({
            prompt,
            resolution: '2k',
            aspect_ratio: 'portrait_3_4',
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

    // Polling até completar ou timeout
    const deadline = Date.now() + POLLING_TIMEOUT;

    while (Date.now() < deadline) {
        await new Promise(r => setTimeout(r, POLLING_INTERVAL));

        const statusRes = await fetch(`https://api.freepik.com/v1/ai/mystic/${taskId}`, {
            headers: { 'x-freepik-api-key': process.env.FREEPIK_API_KEY! },
        });

        if (!statusRes.ok) continue;

        const statusData = await statusRes.json() as {
            data: { status: string; generated: Array<{ url?: string; base64?: string }> }
        };

        if (statusData.data.status === 'COMPLETED') {
            const generated = statusData.data.generated?.[0];
            if (generated?.base64) return generated.base64;

            // Freepik retorna URL — faz download e converte para base64
            if (generated?.url) {
                const imgRes = await fetch(generated.url);
                const buf = Buffer.from(await imgRes.arrayBuffer());
                return buf.toString('base64');
            }
            throw new Error('Freepik completed but no image found');
        }

        if (statusData.data.status === 'FAILED') {
            throw new Error('Freepik task failed');
        }
    }

    throw new Error('Freepik polling timeout');
}

// ── 3. Fallback local / MinIO ──────────────────────────────
async function getFallbackBase64(): Promise<string> {
    const buffer = await getFallbackImageBuffer();
    return buffer.toString('base64');
}

// ── Cascata principal ──────────────────────────────────────
export async function generateCharacterImage(prompt: string): Promise<ImageResult> {
    // Tentativa 1: Gemini
    try {
        console.log('[image.service] Trying Gemini...');
        const base64 = await generateWithGemini(prompt);
        return { base64, source: 'GEMINI' };
    } catch (err) {
        console.warn('[image.service] Gemini failed:', (err as Error).message);
    }

    // Tentativa 2: Freepik
    try {
        console.log('[image.service] Trying Freepik...');
        const base64 = await generateWithFreepik(prompt);
        return { base64, source: 'FREEPIK' };
    } catch (err) {
        console.warn('[image.service] Freepik failed:', (err as Error).message);
    }

    // Fallback final: imagem de erro
    console.warn('[image.service] Using placeholder image');
    const base64 = await getFallbackBase64();
    return { base64, source: 'PLACEHOLDER' };
}

