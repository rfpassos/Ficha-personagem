import { googleImage } from './google-api.service';
import { getFallbackImageBuffer } from '../lib/minio';

export type ImageSource = 'GEMINI' | 'FREEPIK' | 'PLACEHOLDER';

export interface ImageResult {
    base64: string;
    source: ImageSource;
}

// ── 1. Gemini Image Generation (SDK) ────────────────────────
async function generateWithGemini(prompt: string, aspectRatio?: string): Promise<string> {
    const model = 'gemini-3.1-flash-image-preview';
    console.log(`[image.service] Gerando imagem com ${model} (SDK)...`);
    
    // Mapeamento de format para Gemini
    const geminiRatioMap: Record<string, string> = {
        'landscape_21_9': '21:9',
        'landscape_16_9': '16:9',
        'square': '1:1',
        'portrait_2_3': '3:4',
    };

    return await googleImage(model, prompt, {
        temperature: 1.0,
        aspect_ratio: geminiRatioMap[aspectRatio || ''] || '1:1'
    });
}

// ── 2. Freepik API (Fallback) ──────────────────────────────
export type FreepikModel = 'mystic' | 'flux-2-klein' | 'seedream-v4-5' | 'z-image';

export async function generateWithFreepikInternal(
    prompt: string, 
    aspectRatio: string, 
    model: FreepikModel = 'mystic'
): Promise<string> {
    const POLLING_INTERVAL = parseInt(process.env.FREEPIK_POLLING_INTERVAL_MS ?? '2000');
    const POLLING_TIMEOUT = parseInt(process.env.FREEPIK_POLLING_TIMEOUT_MS ?? '30000');

    const config = {
        'mystic': {
            url: 'https://api.freepik.com/v1/ai/mystic',
            body: { 
                prompt, 
                resolution: '2k', 
                aspect_ratio: aspectRatio, 
                model: 'realism', // 'mystic' não é um modelo válido no body, mas sim 'realism', 'fluid', etc.
                filter_nsfw: true,
                engine: 'automatic'
            }
        },
        'flux-2-klein': {
            url: 'https://api.freepik.com/v1/ai/text-to-image/flux-2-klein',
            body: { 
                prompt, 
                aspect_ratio: aspectRatio,
            }
        },
        'seedream-v4-5': {
            url: 'https://api.freepik.com/v1/ai/text-to-image/seedream-v4-5',
            body: { 
                prompt, 
                aspect_ratio: aspectRatio 
            }
        },
        'z-image': {
            url: 'https://api.freepik.com/v1/ai/text-to-image/z-image',
            body: { 
                prompt, 
                image_size: aspectRatio === 'square' ? 'square_hd' : 'portrait_3_4',
                output_format: 'png'
            }
        }
    };

    const modelConfig = config[model];
    console.log(`[image.service] Chamando Freepik ${model}...`);
    
    const submitRes = await fetch(modelConfig.url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-freepik-api-key': process.env.FREEPIK_API_KEY!,
        },
        body: JSON.stringify(modelConfig.body),
    });

    if (!submitRes.ok) {
        const errBody = await submitRes.json().catch(() => ({}));
        console.error(`[image.service] Freepik ${model} submit error:`, submitRes.status, errBody);
        throw new Error(`Freepik ${model} submit failed: ${submitRes.status}`);
    }

    const { data } = await submitRes.json() as { data: { task_id: string; status: string } };
    const taskId = data.task_id;
    const deadline = Date.now() + POLLING_TIMEOUT;

    while (Date.now() < deadline) {
        await new Promise(r => setTimeout(r, POLLING_INTERVAL));
        const statusRes = await fetch(`${modelConfig.url}/${taskId}`, {
            headers: { 'x-freepik-api-key': process.env.FREEPIK_API_KEY! },
        });
        if (!statusRes.ok) continue;
        const statusData = await statusRes.json() as any;
        console.log(`[image.service] Polling ${model} status: ${statusData.data.status}`);
        if (statusData.data.status === 'COMPLETED') {
            const generated = statusData.data.generated?.[0];
            console.log(`[image.service] ${model} final data received.`);
            
            // Caso 1: Array de objetos com base64 ou url
            if (typeof generated === 'object' && generated !== null) {
                if (generated.base64) return generated.base64;
                if (generated.url) {
                    const imgRes = await fetch(generated.url);
                    const buf = Buffer.from(await imgRes.arrayBuffer());
                    return buf.toString('base64');
                }
            }
            
            // Caso 2: Array de strings (URLs diretas)
            if (typeof generated === 'string') {
                const imgRes = await fetch(generated);
                const buf = Buffer.from(await imgRes.arrayBuffer());
                return buf.toString('base64');
            }
        }
        if (statusData.data.status === 'FAILED') throw new Error(`Freepik ${model} task failed`);
    }
    throw new Error(`Freepik ${model} polling timeout`);
}

// ── 3. Fallback local / MinIO ──────────────────────────────
async function getFallbackBase64(): Promise<string> {
    const buffer = await getFallbackImageBuffer();
    return buffer.toString('base64');
}

// ── Cascata principal ──────────────────────────────────────
export interface GenerateImageOptions {
    aspect_ratio?: string;
    model?: FreepikModel;
}

export async function generateImage(prompt: string, options: GenerateImageOptions = {}): Promise<ImageResult> {
    const model = options.model || (process.env.FREEPIK_DEFAULT_MODEL as FreepikModel) || 'mystic';
    
    // Mapeamento para formatos suportados pelo Freepik
    const aspectRatioMap: Record<string, string> = {
        'portrait_3_4': 'portrait_2_3',
        'portrait_4_5': 'portrait_2_3',
        'square': 'square',
        'landscape_16_9': model === 'z-image' ? 'landscape_16_9' : (model === 'flux-2-klein' ? 'widescreen_16_9' : 'landscape_16_9'),
        'landscape_21_9': model === 'mystic' ? 'landscape_21_9' : 'landscape_16_9', 
    };
    const aspectRatio = aspectRatioMap[options.aspect_ratio || ''] || 'portrait_2_3';

    // Tentativa 1: Gemini 3.1 (Nova Image Preview)
    try {
        console.log('[image.service] Tentando gerar com Gemini 3.1...');
        const base64 = await generateWithGemini(prompt, options.aspect_ratio);
        console.log('[image.service] Sucesso com Gemini.');
        return { base64, source: 'GEMINI' };
    } catch (err: any) {
        console.warn('[image.service] Gemini SDK failed:', err.message);
        console.log('[image.service] Iniciando fallback para Freepik...');
    }

    // Tentativa 2: Freepik
    try {
        console.log(`[image.service] Tentando gerar com Freepik model: ${model}...`);
        const base64 = await generateWithFreepikInternal(prompt, aspectRatio, model);
        console.log(`[image.service] Sucesso com Freepik (${model}).`);
        return { base64, source: 'FREEPIK' };
    } catch (err: any) {
        console.warn(`[image.service] Freepik ${model} failed:`, err.message);
    }

    // Fallback final: imagem de erro
    console.warn('[image.service] Utilizando fallback final: PLACEHOLDER (Erro em todos os provedores)');
    const base64 = await getFallbackBase64();
    return { base64, source: 'PLACEHOLDER' };
}

export const generateCharacterImage = (prompt: string) => generateImage(prompt);
