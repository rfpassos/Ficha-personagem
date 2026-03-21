import { GoogleGenerativeAI } from '@google/generative-ai';
import { CharacterInput } from '../types/character.types';
import * as fs from 'fs';
import * as path from 'path';

export class LLMParserService {
    private static genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    private static model = LLMParserService.genAI.getGenerativeModel({ 
        model: 'gemini-3.1-flash-lite-preview',
        generationConfig: { responseMimeType: 'application/json' }
    });

    private static getPromptTemplate(): string {
        const promptPath = path.join(__dirname, '../../assets/prompts/parse-character.md');
        if (fs.existsSync(promptPath)) {
            return fs.readFileSync(promptPath, 'utf-8');
        } else {
            throw new Error(`Arquivo de prompt não encontrado em: ${promptPath}`);
        }
    }

    /**
     * Transforma qualquer entrada (Markdown, JSON aleatório, Texto) em um CharacterInput padronizado (D&D 5e)
     */
    static async parseToCharacter(content: string): Promise<CharacterInput> {
        const template = this.getPromptTemplate();
        const prompt = template.replace('{{content}}', content);

        try {
            const result = await this.model.generateContent(prompt);
            const response = result.response;
            let text = response.text();
            
            // Tenta encontrar e extrair apenas o bloco JSON
            const firstBrace = text.indexOf('{');
            const lastBrace = text.lastIndexOf('}');
            
            if (firstBrace !== -1 && lastBrace !== -1) {
                text = text.substring(firstBrace, lastBrace + 1);
            }

            let parsed: any;
            try {
                parsed = JSON.parse(text);
            } catch (err) {
                console.error('[LLMParserService] Texto gerado que falhou no parse:', text);
                throw err;
            }
            
            return parsed as CharacterInput;
        } catch (error) {
            console.error('[LLMParserService] Erro ao processar:', error);
            throw new Error('Falha ao processar a ficha de personagem via IA. Verifique se o conteúdo é válido.');
        }
    }
}
