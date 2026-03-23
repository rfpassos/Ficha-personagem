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
        let prompt = template.replace('{{content}}', content);

        // Anexar Lista Opcional de Magias Oficiais para resolução de sinônimos/tradução
        try {
            const spellsDataPath = path.join(__dirname, '../../assets/data/magias-dnd-ptbr.json');
            const synonymsPath = path.join(__dirname, '../../assets/data/spell-synonyms.json');
            
            if (fs.existsSync(spellsDataPath)) {
                const spellsDb = JSON.parse(fs.readFileSync(spellsDataPath, 'utf8'));
                const dictionary = spellsDb.map((s: any) => `- ID: "${s.id}" | Nome: "${s.SpellName}"`).join('\n');
                
                let extraSynonyms = '';
                if (fs.existsSync(synonymsPath)) {
                    const synData = JSON.parse(fs.readFileSync(synonymsPath, 'utf8'));
                    extraSynonyms = `\n\n### APELIDOS/SINÔNIMOS CONHECIDOS (MAPEAMENTO DIRETO):\nUtilize esse mapeamento se encontrar estes termos no PDF:\n` + 
                        Object.entries(synData).map(([alias, id]) => `- "${alias}" -> ID: "${id}"`).join('\n');
                }

                prompt += `\n\n### DICIONÁRIO FORNECIDO (MAGIAS OFICIAIS)\nUtilize esta lista estrita para preencher as chaves "id" e "name" do spell_description e solucionar divergências de tradução.\n\n${dictionary}${extraSynonyms}\n`;
            }
        } catch (e) {
            console.error('[parser.service] Erro ao carregar dicionário de magias:', e);
        }

        try {
            const result = await this.model.generateContent(prompt);
            const response = result.response;
            let text = response.text().trim();
            
            console.log('[LLMParserService] Resposta bruta da Gemini:', text);
            
            // Limpa formatação markdown caso o Gemini retorne ```json ... ```
            text = text.replace(/^```(json)?|```$/gi, '').trim();

            let parsed: any;
            try {
                parsed = JSON.parse(text);
            } catch (err) {
                // Tenta reparar caso a IA tenha adicionado chaves `}` sobrando no final do JSON
                let fixedText = text;
                while (fixedText.length > 0) {
                    try {
                        parsed = JSON.parse(fixedText);
                        break;
                    } catch (e) {
                        const lastBraceIdx = fixedText.lastIndexOf('}');
                        if (lastBraceIdx === -1) break;
                        fixedText = fixedText.substring(0, lastBraceIdx).trim();
                    }
                }
                
                if (!parsed) {
                    console.error('[LLMParserService] Texto gerado que falhou no parse:', text);
                    throw err;
                }
            }
            
            return parsed as CharacterInput;
        } catch (error) {
            console.error('[LLMParserService] Erro ao processar:', error);
            throw new Error('Falha ao processar a ficha de personagem via IA. Verifique se o conteúdo é válido.');
        }
    }
}
