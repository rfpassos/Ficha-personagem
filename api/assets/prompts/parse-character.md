# Prompt de Conversão de Fichas de D&D 5e

Tarefa: Interpretar e Converter o conteúdo abaixo em um JSON estruturado para uma ficha de personagem de D&D 5e v2.
Siga RIGOROSAMENTE o esquema e nomes de campos em INGLÊS conforme o exemplo "ESQUEMA JSON ALVO".

## REGRAS

1. Extraia o máximo de detalhes possível do texto original.
2. Calcule modificadores (Ex: For 18 = +4) e perícias se não estiverem explícitos.
3. No campo spell_description, se houver magias, mapeie-as para o ID oficial com a ajuda do Dicionário Fornecido. No JSON resultante, o campo "id" DEVE ser o ID oficial do dicionário, mas o campo "name" DEVE ser o nome exatamente como aparece no PDF original (mesmo que seja um sinônimo ou apelido). Oculte níveis e descrições. Exemplo: [{"id": "muralha-de-energia", "name": "Muralha de Força"}]. Se não houver magias, o campo spell_description deve ser um array vazio [].
4. Os valores de atributos devem ser apenas o NÚMERO (Ex: 15).
5. Traduza os valores (Raça, Classe, Perícias) para Português, mas mantenha as CHAVES do JSON em Inglês conforme acima.
6. ATENÇÃO: Nunca use aspas duplas não escapadas dentro de strings. O sistema deve gerar um JSON sintaticamente perfeito e livre de chaves adicionais.
7. O conteúdo do JSON deve ser em Português (BR), deve manter as chaves do JSON em inglês.
8. Quando não tiver informação suficiente para preencher um campo, deixe-o como null.
9. Se não tiver informação para uma lista, deixe-a como [] (array vazio).
10. Você deve fazer somente um parser de fichas de RPG. Responda APENAS com o JSON puro, sem blocos de código, sem explicações, sem ```json```. Apenas o objeto JSON diretamente.

## CONTEÚDO PARA PARSE

---

{{content}}

---

## ESQUEMA JSON ALVO

{
  "character_name": "string",
  "race": "string",
  "class": "string",
  "subclass": "string",
  "level": "number",
  "basic_info": { "archetype": "string", "background": "string", "alignment": "string" },
  "health_and_defense": {
    "current_hp": "number", "max_hp": "number", "hit_dice": "string",
    "armor_class": "number", "movement": "string", "initiative": "string",
    "resistances_immunities": "string"
  },
  "attributes": {
    "strength": { "value": "number", "modifier": "string", "save": "string" },
    "dexterity": { "value": "number", "modifier": "string", "save": "string" },
    "constitution": { "value": "number", "modifier": "string", "save": "string" },
    "intelligence": { "value": "number", "modifier": "string", "save": "string" },
    "wisdom": { "value": "number", "modifier": "string", "save": "string" },
    "charisma": { "value": "number", "modifier": "string", "save": "string" }
  },
  "proficiencies": {
    "saving_throws": ["string"],
    "skill_proficiencies": [ { "name": "string", "attribute": "string", "proficient": "boolean", "expertise": "boolean", "modifier": "string" } ],
    "armor_proficiencies": "string",
    "weapon_proficiencies": "string",
    "tools_and_languages": ["string"]
  },
  "abilities_and_features": { "racial_traits": ["string"], "class_features": ["string"], "background_features": ["string"], "feats": ["string"] },
  "attacks": [ { "name": "string", "attack_bonus": "string", "damage_and_type": "string" } ],
  "spellcasting": {
    "spellcasting_ability": "string", "spell_save_dc": "string", "spell_attack_bonus": "string",
    "cantrips": ["string"], "spell_slots": "string", "spells_prepared": ["string"]
  },
  "equipment": { "armor": ["string"], "magic_items": ["string"], "general_equipment": ["string"], "money": { "gold": "number" } },
  "personality": { "trait": "string", "ideal": "string", "bond": "string", "flaw": "string" },
  "backstory": "string",
  "appearance_and_style": {
    "physical_appearance": "string", "clothing_style": "string", "age": "string", "height": "string", "weight": "string",
    "eyes": "string", "hair": "string", "skin": "string"
  },
  "goals_and_motivations": { "main_goal": "string", "motivations": "string" },
  "game_notes": { "combat_behavior": "string", "social_interactions": "string" },
  "spell_description": [ { "id": "string", "name": "string" } ],
  "metadata": { "template_title": "string", "version": "1.4.0", "system": "D&D 5e" }
}
