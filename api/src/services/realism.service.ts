import { googleChat } from './google-api.service';

/**
 * Converte um prompt base em um prompt fotorrealista de alta fidelidade.
 * Segue o meta-prompt de realism cru solicitado pelo usuário.
 */
export async function convertToRealismPrompt(basePrompt: string): Promise<string> {
    const metaPrompt = `
**OBJETIVO:** Converta o prompt abaixo em um prompt fotorrealista de alta fidelidade para geração de arte de magia de RPG.
REGRAS:
- Estilo: "Raw, unretouched, natural indie film aesthetic".
- Detalhes: Textura crua, poros microscópicos, imperfeições sutis.
- Equipamento: "35mm lens, f/1.8, cinematic lighting".
- PROIBIDO: 3D, CGI, estilos de animação ou plástico.
- FOCO: A magia deve parecer um efeito prático de set de filmagem, não um efeito digital.

PROMPT BASE: ${basePrompt}
`;

    try {
        console.log('[realism.service] Chamando Gemini (3.1 Lite) via REST...');
        const converted = await googleChat('gemini-3.1-flash-lite-preview', metaPrompt, { 
            temperature: 0.9,
            maxOutputTokens: 500
        });
        
        if (converted && converted.length > 10) {
            return converted.trim();
        }
    } catch (err: any) {
        console.warn('[realism.service] REST falhou na conversão:', err.message);
    }

    // Fallback Manual de Alta Qualidade
    return `Hyper-realistic close-up portrait of a mystical spell manifestation, ${basePrompt}. 
    CRUCIAL AESTHETIC: Raw, unretouched cinematic photo, 35mm lens. 
    Natural lighting with visible dust particles, cinematic grain, practical effects style. 
    Indie film look, highly detailed textures, realistic lighting blooms, sharp focus on the arcane elements. 
    NO CGI, NO 3D, pure photographic realism.`;
}
