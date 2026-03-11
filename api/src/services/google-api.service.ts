const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * Chamada genérica de texto via REST API
 */
export async function googleChat(model: string, prompt: string, config: any = {}): Promise<string> {
    const url = `${BASE_URL}/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    
    console.log(`[google-api] Chamando REST: ${model}...`);
    
    const body = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            ...config,
            // Fallback para campos específicos se necessário
            stopSequences: config.stopSequences || [],
            temperature: config.temperature ?? 0.7,
            maxOutputTokens: config.maxOutputTokens ?? 2048,
        }
    };

    let lastError: any;
    for (let i = 0; i < 3; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.status === 429 || response.status === 400) {
                const errJson = await response.clone().json() as any;
                console.warn(`[google-api] Alerta/Erro (${response.status}): ${JSON.stringify(errJson)}`);
                if (errJson?.error?.status === 'RESOURCE_EXHAUSTED' || response.status === 429) {
                    console.warn(`[google-api] Limite atingido. Tentando em ${5 * (i + 1)}s...`);
                    await new Promise(r => setTimeout(r, 5000 * (i + 1)));
                    continue;
                }
            }

            if (!response.ok) {
                const errData = await response.json() as any;
                throw new Error(`Google API REST Error: ${response.status} - ${JSON.stringify(errData)}`);
            }

            const data = await response.json() as any;
            return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        } catch (err: any) {
            lastError = err;
            if (i === 2) break;
            await new Promise(r => setTimeout(r, 2000));
        }
    }
    throw lastError;
}

/**
 * Chamada de imagem via REST API
 */
export async function googleImage(model: string, prompt: string, config: any = {}): Promise<string> {
    const url = `${BASE_URL}/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    
    console.log(`[google-api] Chamando REST (Image): ${model}...`);

    const body = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            ...config,
            response_modalities: ["IMAGE", "TEXT"]
        }
    };

    // Para modelos 3.1 Preview de imagem, o thinking_config pode ser passado aqui
    if (config.thinking_config) {
        // @ts-ignore
        body.generationConfig.thinking_config = config.thinking_config;
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errData = await response.json() as any;
        throw new Error(`Google API REST Error: ${response.status} - ${JSON.stringify(errData)}`);
    }

    const data = await response.json() as any;
    const parts = data.candidates?.[0]?.content?.parts || [];
    
    for (const part of parts) {
        if (part.inline_data || part.inlineData) {
            const inline = part.inline_data || part.inlineData;
            return inline.data; // base64
        }
    }

    throw new Error('Google REST API did not return an image part. Verifique se o prompt não foi bloqueado por filtros de segurança.');
}
