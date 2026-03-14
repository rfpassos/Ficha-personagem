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
    // Usando o alias estável sugerido pelo usuário e AI Studio
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    const systemContext = `You are an expert at creating detailed art prompts for fantasy RPG character illustrations. 
Create a vivid, detailed prompt for generating a character portrait.`;

    const userPrompt = `Create a detailed image generation prompt in English for a fantasy RPG character with these traits:
- Race: ${character.raca}
- Class: ${character.classe}
- Appearance: ${character.aparencia ?? 'not specified'}
- Personality: ${character.personalidade ?? 'not specified'}
- Alignment: ${character.alinhamento ?? 'not specified'}

The prompt should describe: physical appearance, clothing/armor, expression, pose. Output ONLY the prompt.`;

    const result = await model.generateContent([systemContext, userPrompt]);
    const basePrompt = result.response.text().trim();

    // Aplica o filtro de realismo universal
    console.log('[prompt.service] Aplicando filtro de realismo ao personagem...');
    return await convertToRealismPrompt(basePrompt);
}

