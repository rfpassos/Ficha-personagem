import { GoogleGenerativeAI } from '@google/generative-ai';
import type { CharacterInput } from '../types/character.types';
import { convertToRealismPrompt } from './realism.service';

/**
 * Obtém a instância do SDK carregando a chave do process.env no momento da chamada
 */
function getGenAI() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error('GEMINI_API_KEY não encontrada no process.env');
    return new GoogleGenerativeAI(key);
}

export async function generateCharacterPrompt(character: CharacterInput): Promise<string> {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });

    console.log(`[prompt.service] --- TRILHA DE PROMPT PARA: ${character.character_name} ---`);
    console.log('[prompt.service] 1. Descrição Original da Ficha:', character.appearance_and_style.physical_appearance);

    const systemContext = `You are an expert at creating detailed art prompts for fantasy RPG character illustrations. 
Create a vivid, detailed prompt for generating a character portrait.`;

    const userPrompt = `Create a detailed image generation prompt in English for a fantasy RPG character with these traits:
- Name: ${character.character_name}
- Race: ${character.race}
- Class: ${character.class}
- Appearance: ${character.appearance_and_style.physical_appearance}
- Personality: ${character.personality.trait}
- Alignment: ${character.basic_info.alignment}

The prompt should describe: physical appearance, clothing/armor, expression, pose. Output ONLY the prompt.`;

    const result = await model.generateContent([systemContext, userPrompt]);
    const basePrompt = result.response.text().trim();
    console.log('[prompt.service] 2. Prompt Base Gerado pela IA:', basePrompt);

    // Aplica o filtro de realismo universal
    console.log('[prompt.service] 3. Aplicando Meta-prompt de Realismo...');
    const finalPrompt = await convertToRealismPrompt(basePrompt);
    console.log('[prompt.service] 4. Prompt Final (Meta-prompted):', finalPrompt);
    console.log('[prompt.service] -------------------------------------------');

    return finalPrompt;
}

