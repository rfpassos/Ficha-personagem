import fs from 'fs';
import path from 'path';
import { googleChat } from './google-api.service';

/**
 * Converte um prompt base em um prompt fotorrealista de alta fidelidade.
 * Lê a configuração de um arquivo markdown externo para facilitar ajustes.
 */
export async function convertToRealismPrompt(basePrompt: string): Promise<string> {
    try {
        const metaPromptPath = path.join(__dirname, '../../assets/prompts/realism-meta.md');
        let metaPrompt = fs.readFileSync(metaPromptPath, 'utf8');
        
        // Injeta o prompt base no local indicado
        metaPrompt = metaPrompt.replace('{{basePrompt}}', basePrompt);

        const systemInstruction = "Você é um especialista em engenharia de prompt para IA de imagem fotorrealista. Sua tarefa é converter o PROMPT BASE em um prompt técnico e altamente detalhado para geradores de imagem (como FLUX ou Gemini). Retorne APENAS o prompt convertido em inglês, sem explicações, saudações ou comentários de qualquer tipo.";
        
        console.log('[realism.service] Chamando Gemini (3.1 Lite) para conversão de realismo...');
        const converted = await googleChat('gemini-flash-latest', metaPrompt, { 
            systemInstruction,
            temperature: 0.9,
            maxOutputTokens: 600
        });
        
        if (converted && converted.length > 10) {
            // Limpa blocos de código markdown se o modelo os incluiu
            let cleaned = converted.trim();
            if (cleaned.startsWith('```')) {
                cleaned = cleaned.replace(/^```[a-z]*\n/i, '').replace(/\n```$/i, '');
            }
            return cleaned.trim();
        }
    } catch (err: any) {
        console.warn('[realism.service] Falha ao converter para realismo (usando fallback):', err.message);
    }

    // Fallback Manual de Alta Qualidade
    return `Hyper-realistic close-up portrait, ${basePrompt}. 
    CRUCIAL AESTHETIC: Raw, unretouched cinematic photo, 35mm lens. 
    Natural lighting, cinematic grain, practical effects style. 
    Indie film look, highly detailed textures, realistic lighting blooms. 
    NO CGI, NO 3D, pure photographic realism.`;
}
