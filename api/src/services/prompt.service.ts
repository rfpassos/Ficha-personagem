import { GoogleGenerativeAI } from '@google/generative-ai';
import type { CharacterInput } from '../types/character.types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateImagePrompt(character: CharacterInput): Promise<string> {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const systemContext = `You are an expert at creating detailed art prompts for fantasy RPG character illustrations 
in the style of Dungeons & Dragons official artwork. Create a vivid, detailed prompt for generating a character portrait.`;

    const userPrompt = `Create a detailed image generation prompt in English for a fantasy RPG character with these traits:
- Race: ${character.raca}
- Class: ${character.classe}
- Appearance: ${character.aparencia ?? 'not specified'}
- Personality: ${character.personalidade ?? 'not specified'}
- Alignment: ${character.alinhamento ?? 'not specified'}

The prompt should describe: physical appearance, clothing/armor, expression, pose, lighting, art style.
Keep it under 300 words. Focus on visual details only. Output ONLY the prompt, no explanations.`;

    const result = await model.generateContent([systemContext, userPrompt]);
    const text = result.response.text().trim();
    return text;
}

