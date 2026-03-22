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
                // @ts-ignore - CamelCase é o padrão no SDK de Node.js
                thinkingConfig: {
                    includeThoughts: true,
                },
                // @ts-ignore - Passando individualmente o que o SDK suporta no generationConfig
                responseModalities: ["IMAGE", "TEXT"],
                ...safeConfig
            }
        });

        // Chamada direta. Como a IA recebe 'IMAGE', ela entende que deve gerar pixels.
        // Como o aspect_ratio agora está ausente no config, ela lerá do prompt.
        const result = await genModel.generateContent(prompt);
        const parts = result.response.candidates?.[0]?.content?.parts || [];
        
        for (const part of parts) {
            if (part.inlineData) {
                return part.inlineData.data; // base64
            }
        }

        throw new Error('O Google SDK não retornou uma parte de imagem. Isso pode ocorrer por bloqueio de segurança (Hate/Harassment) ou falta de suporte do modelo para este prompt específico.');
    } catch (err: any) {
        console.error(`[google-api] Erro na imagem (SDK):`, err.message || err);
        throw err;
    }
}
