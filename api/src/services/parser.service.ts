import { GoogleGenerativeAI } from '@google/generative-ai';
import { CharacterInput } from '../types/character.types';

export class LLMParserService {
    private static genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    private static model = LLMParserService.genAI.getGenerativeModel({ 
        model: 'gemini-3.1-flash-lite-preview',
        generationConfig: { responseMimeType: 'application/json' }
    });

    /**
     * Transforma qualquer entrada (Markdown, JSON aleatório, Texto) em um CharacterInput padronizado (D&D 5e)
     */
    static async parseToCharacter(content: string): Promise<CharacterInput> {
        const prompt = `
Tarefa: Converter o conteúdo abaixo em um JSON estruturado para uma ficha de personagem de D&D 5e v2.
Siga RIGOROSAMENTE o esquema e nomes de campos em INGLÊS conforme o exemplo.

CONTEÚDO PARA PARSE:
---
${content}
---

ESQUEMA JSON ALVO (Ref: Modelo-DnD-v2.json):
{
  "character_name": string,
  "race": string,
  "class": string,
  "level": number,
  "basic_info": { "archetype": string, "background": string, "alignment": string },
  "health_and_defense": { 
    "current_hp": number, "max_hp": number, "hit_dice": string, 
    "armor_class": number, "movement": string, "initiative": string,
    "resistances_immunities": string
  },
  "attributes": {
    "strength": { "value": number, "modifier": string, "save": string },
    "dexterity": { "value": number, "modifier": string, "save": string },
    "constitution": { "value": number, "modifier": string, "save": string },
    "intelligence": { "value": number, "modifier": string, "save": string },
    "wisdom": { "value": number, "modifier": string, "save": string },
    "charisma": { "value": number, "modifier": string, "save": string }
  },
  "proficiencies": {
    "saving_throws": string[],
    "skill_proficiencies": [ { "name": string, "attribute": string, "proficient": boolean, "expertise": boolean, "modifier": string } ],
    "tools_and_languages": string[]
  },
  "abilities_and_features": { "racial_traits": string[], "class_features": string[], "background_features": string[] },
  "attacks": [ { "name": string, "attack_bonus": string, "damage_and_type": string } ],
  "spellcasting": {
    "spellcasting_ability": string, "spell_save_dc": string, "spell_attack_bonus": string,
    "cantrips": string[], "spell_slots": string, "spells_prepared": string[]
  },
  "equipment": { "armor": string[], "magic_items": string[], "general_equipment": string[], "money": { "gold": number } },
  "personality": { "trait": string, "ideal": string, "bond": string, "flaw": string },
  "backstory": string,
  "appearance_and_style": { 
    "physical_appearance": string, "clothing_style": string, "age": string, "height": string, "weight": string,
    "eyes": string, "hair": string, "skin": string
  },
  "goals_and_motivations": { "main_goal": string, "motivations": string },
  "game_notes": { "combat_behavior": string, "social_interactions": string },
  "spell_description": [ { "name": string, "level": string, "school": string, "casting_time": string, "range": string, "description": string, "narrative": string } ],
  "metadata": { "template_title": string, "version": "1.4.0" }
}

REGRAS:
1. Extraia o máximo de detalhes possível do texto original.
2. Calcule modificadores (Ex: For 18 = +4) e perícias se não estiverem explícitos.
3. Se não houver magias, o campo spell_description deve ser um array vazio [].
4. Os valores de atributos devem ser apenas o NÚMERO (Ex: 15).
5. Traduza os valores (Raça, Classe, Perícias) para Português, mas mantenha as CHAVES do JSON em Inglês conforme acima.
`;

        try {
            const result = await this.model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            
            const parsed = JSON.parse(text);
            
            return parsed as CharacterInput;
        } catch (error) {
            console.error('[LLMParserService] Erro ao fazer parse da ficha:', error);
            throw new Error('Falha ao processar a ficha de personagem via IA. Verifique se o conteúdo é válido.');
        }
    }
}
