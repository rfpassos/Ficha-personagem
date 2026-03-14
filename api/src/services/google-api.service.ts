import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Obtém a instância do SDK garantindo que a chave esteja atualizada (process.env)
 */
function getGenAI() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error('GEMINI_API_KEY não encontrada no process.env');
    return new GoogleGenerativeAI(key);
}

/**
 * Chamada genérica de texto via SDK Oficial
 */
export async function googleChat(model: string, prompt: string, config: any = {}): Promise<string> {
    console.log(`[google-api] Chamando SDK: ${model}...`);
    
    try {
        const genAI = getGenAI();
        const genModel = genAI.getGenerativeModel({ 
            model,
            systemInstruction: config.systemInstruction,
            generationConfig: {
                temperature: config.temperature ?? 0.7,
                maxOutputTokens: config.maxOutputTokens ?? 2048,
                topP: config.topP,
                topK: config.topK,
                stopSequences: config.stopSequences,
            }
        });

        const result = await genModel.generateContent(prompt);
        return result.response.text();
    } catch (err: any) {
        console.error(`[google-api] Erro no SDK:`, err.message || err);
        throw err;
    }
}

/**
 * Chamada de imagem via SDK Oficial (Modelos 3.1 Flash Lite)
 */
export async function googleImage(model: string, prompt: string, config: any = {}): Promise<string> {
    console.log(`[google-api] Chamando SDK (Image): ${model}...`);

    try {
        const genAI = getGenAI();
        // Extraímos campos que sabemos que o SDK v0.x pode rejeitar na raiz da config
        const { aspect_ratio, ...safeConfig } = config;

        const genModel = genAI.getGenerativeModel({ 
            model,
            generationConfig: {
                // @ts-ignore
                response_modalities: ["IMAGE", "TEXT"],
                ...safeConfig
            }
        });

        // Para o Gemini 3.1 Flash Image Preview, o aspect ratio costuma ser inferido ou 
        // passado via parâmetros experimentais. Por enquanto, vamos confiar no prompt reforçado.
        const finalPrompt = aspect_ratio ? `${prompt} [ASPECT RATIO ${aspect_ratio}]` : prompt;

        const result = await genModel.generateContent(finalPrompt);
        const parts = result.response.candidates?.[0]?.content?.parts || [];
        
        for (const part of parts) {
            if (part.inlineData) {
                return part.inlineData.data; // base64
            }
        }

        throw new Error('Google SDK did not return an image part. Verifique se o prompt não foi bloqueado por filtros de segurança.');
    } catch (err: any) {
        console.error(`[google-api] Erro na imagem (SDK):`, err.message || err);
        throw err;
    }
}
