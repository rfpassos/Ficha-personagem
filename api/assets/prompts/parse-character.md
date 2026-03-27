# Prompt de Conversão de Fichas de D&D 5e

Tarefa: Interpretar e Converter o conteúdo abaixo em um JSON estruturado para uma ficha de personagem de D&D 5e v2.
Siga RIGOROSAMENTE o esquema e nomes de campos em INGLÊS conforme o exemplo "ESQUEMA JSON ALVO".

## REGRAS

1. Extraia o máximo de detalhes possível do texto original.
2. Calcule modificadores (Ex: For 18 = +4) e perícias se não estiverem explícitos.
3. No campo spell_description, se houver magias, extraia o NOME, NÍVEL, ESCOLA, TEMPO DE CONJURAÇÃO, ALCANCE, COMPONENTES, DURAÇÃO e DESCRIÇÃO detalhada. Se houver um "narrative" (flavor text), inclua-o também. Não oculte informações. Se não houver magias, o campo spell_description deve ser um array vazio [].
4. Os valores de atributos devem ser apenas o NÚMERO (Ex: 15).
5. Calcule as perícias com base no bônus de proficiência (BP) do nível do personagem e no modificador do atributo correspondente. Se o personagem tiver PROFICIÊNCIA em uma perícia, o modificador é [Mod de Atributo + BP]. Se tiver EXPERTISE, é [Mod de Atributo + (2 * BP)].
6. Extraia o máximo de informações sobre o comportamento do personagem para preencher `game_notes`:
    - `combat_behavior`: Como o personagem age em luta (agressivo, tático, protetor).
    - `social_interactions`: Como ele interage com NPCs (diplomático, ríspido, charmoso).
    - `future_development`: Desejos de evolução, novos talentos ou subclasses pretendidas.
7. Traduza os valores (Raça, Classe, Perícias) para Português, mas mantenha as CHAVES do JSON em Inglês conforme acima.
8. EXTRAÇÃO DE MOEDAS: Mapeie as siglas de moedas para os campos correspodentes:
   - "PO" ou "GP" -> `gold`
   - "PP" ou "SP" -> `silver`
   - "PC" ou "CP" -> `copper`
   - "PE" ou "EP" -> `electrum`
   - "PL" ou "PP" (Platina) -> `platinum`
   - Extraia apenas o NÚMERO (Ex: "15 PO" vira `gold: 15`).
9. INFORMAÇÕES BÁSICAS: Garante que `alignment` (Alinhamento) e `background` (Antecedente) sejam extraídos corretamente do texto original e inseridos em `basic_info`.
10. NOMES DE MAGIAS: No campo `spells_prepared`, use apenas o nome limpo da magia (ex: "Escudo Arcano" em vez de "Escudo Arcano (Shield)"). O nome técnico/original entre parênteses deve ser mantido APENAS na lista `spell_description`.
11. ATENÇÃO: Nunca use aspas duplas não escapadas dentro de strings. O sistema deve gerar um JSON sintaticamente perfeito.
12. Quando não tiver informação suficiente para preencher um campo, deixe-o como null ou [] conforme o tipo.
13. Você deve fazer somente um parser de fichas de RPG. Responda APENAS com o JSON puro, sem blocos de código, sem explicações, sem ```json```.

## CONTEÚDO PARA PARSE

---

{{content}}

---

## ESQUEMA JSON ALVO

{
  "character_name": "{{CHARACTER_NAME}}",
  "race": "{{RACE}}",
  "class": "{{CLASS}}",
  "level": "{{LEVEL}}",
  "basic_info": {
    "system": "Dungeons & Dragons",
    "full_name": "{{CHARACTER_NAME}}",
    "archetype": "{{ARCHETYPE}}",
    "background": "{{BACKGROUND}}",
    "alignment": "{{ALIGNMENT}}",
    "inspiration": false
  },
  "health_and_defense": {
    "current_hp": "{{CURRENT_HP}}",
    "max_hp": "{{MAX_HP}}",
    "hit_dice": "{{HD}}",
    "armor_class": "{{AC}}",
    "movement": "{{MOVEMENT}}",
    "initiative": "{{INITIATIVE}}",
    "death_saves": { "successes": 0, "failures": 0 },
    "resistances_immunities": "{{RESISTANCES}}"
  },
  "attributes": {
    "strength": { "value": "{{STRENGTH_VALUE}}", "modifier": "{{STRENGTH_MOD}}", "save": "{{STRENGTH_SAVE}}" },
    "dexterity": { "value": "{{DEXTERITY_VALUE}}", "modifier": "{{DEXTERITY_MOD}}", "save": "{{DEXTERITY_SAVE}}" },
    "constitution": { "value": "{{CONSTITUTION_VALUE}}", "modifier": "{{CONSTITUTION_MOD}}", "save": "{{CONSTITUTION_SAVE}}" },
    "intelligence": { "value": "{{INTELLIGENCE_VALUE}}", "modifier": "{{INTELLIGENCE_MOD}}", "save": "{{INTELLIGENCE_SAVE}}" },
    "wisdom": { "value": "{{WISDOM_VALUE}}", "modifier": "{{WISDOM_MOD}}", "save": "{{WISDOM_SAVE}}" },
    "charisma": { "value": "{{CHARISMA_VALUE}}", "modifier": "{{CHARISMA_MOD}}", "save": "{{CHARISMA_SAVE}}" }
  },
  "proficiencies": {
    "saving_throws": ["{{SAVE_PROFICIENCIES}}"],
    "skill_proficiencies": [
      { "name": "Acrobacia", "attribute": "Des", "proficient": "{{ACROBACIA_PROFICIENT}}", "expertise": "{{ACROBACIA_EXPERTISE}}", "modifier": "{{ACROBACIA_MODIFIER}}" },
      { "name": "Adestrar Animais", "attribute": "Sab", "proficient": "{{ADESTRAR_ANIMAIS_PROFICIENT}}", "expertise": "{{ADESTRAR_ANIMAIS_EXPERTISE}}", "modifier": "{{ADESTRAR_ANIMAIS_MODIFIER}}" },
      { "name": "Arcanismo", "attribute": "Int", "proficient": "{{ARCANISMO_PROFICIENT}}", "expertise": "{{ARCANISMO_EXPERTISE}}", "modifier": "{{ARCANISMO_MODIFIER}}" },
      { "name": "Atletismo", "attribute": "For", "proficient": "{{ATLETISMO_PROFICIENT}}", "expertise": "{{ATLETISMO_EXPERTISE}}", "modifier": "{{ATLETISMO_MODIFIER}}" },
      { "name": "Atuação", "attribute": "Car", "proficient": "{{ATUACAO_PROFICIENT}}", "expertise": "{{ATUACAO_EXPERTISE}}", "modifier": "{{ATUACAO_MODIFIER}}" },
      { "name": "Enganação", "attribute": "Car", "proficient": "{{ENGANACAO_PROFICIENT}}", "expertise": "{{ENGANACAO_EXPERTISE}}", "modifier": "{{ENGANACAO_MODIFIER}}" },
      { "name": "Furtividade", "attribute": "Des", "proficient": "{{FURTIVIDADE_PROFICIENT}}", "expertise": "{{FURTIVIDADE_EXPERTISE}}", "modifier": "{{FURTIVIDADE_MODIFIER}}" },
      { "name": "História", "attribute": "Int", "proficient": "{{HISTORIA_PROFICIENT}}", "expertise": "{{HISTORIA_EXPERTISE}}", "modifier": "{{HISTORIA_MODIFIER}}" },
      { "name": "Intimidação", "attribute": "Car", "proficient": "{{INTIMIDACAO_PROFICIENT}}", "expertise": "{{INTIMIDACAO_EXPERTISE}}", "modifier": "{{INTIMIDACAO_MODIFIER}}" },
      { "name": "Intuição", "attribute": "Sab", "proficient": "{{INTUICAO_PROFICIENT}}", "expertise": "{{INTUICAO_EXPERTISE}}", "modifier": "{{INTUICAO_MODIFIER}}" },
      { "name": "Investigação", "attribute": "Int", "proficient": "{{INVESTIGACAO_PROFICIENT}}", "expertise": "{{INVESTIGACAO_EXPERTISE}}", "modifier": "{{INVESTIGACAO_MODIFIER}}" },
      { "name": "Medicina", "attribute": "Sab", "proficient": "{{MEDICINA_PROFICIENT}}", "expertise": "{{MEDICINA_EXPERTISE}}", "modifier": "{{MEDICINA_MODIFIER}}" },
      { "name": "Natureza", "attribute": "Int", "proficient": "{{NATUREZA_PROFICIENT}}", "expertise": "{{NATUREZA_EXPERTISE}}", "modifier": "{{NATUREZA_MODIFIER}}" },
      { "name": "Percepção", "attribute": "Sab", "proficient": "{{PERCEPCAO_PROFICIENT}}", "expertise": "{{PERCEPCAO_EXPERTISE}}", "modifier": "{{PERCEPCAO_MODIFIER}}" },
      { "name": "Persuasão", "attribute": "Car", "proficient": "{{PERSUASAO_PROFICIENT}}", "expertise": "{{PERSUASAO_EXPERTISE}}", "modifier": "{{PERSUASAO_MODIFIER}}" },
      { "name": "Prestidigitação", "attribute": "Des", "proficient": "{{PRESTIDIGITACAO_PROFICIENT}}", "expertise": "{{PRESTIDIGITACAO_EXPERTISE}}", "modifier": "{{PRESTIDIGITACAO_MODIFIER}}" },
      { "name": "Religião", "attribute": "Int", "proficient": "{{RELIGIAO_PROFICIENT}}", "expertise": "{{RELIGIAO_EXPERTISE}}", "modifier": "{{RELIGIAO_MODIFIER}}" },
      { "name": "Sobrevivência", "attribute": "Sab", "proficient": "{{SOBREVIVENCIA_PROFICIENT}}", "expertise": "{{SOBREVIVENCIA_EXPERTISE}}", "modifier": "{{SOBREVIVENCIA_MODIFIER}}" }
    ],
    "tools_and_languages": ["{{TOOLS_LANGUAGES}}"]
  },
  "abilities_and_features": {
    "racial_traits": ["{{RACIAL_TRAITS}}"],
    "class_features": ["{{CLASS_FEATURES}}"],
    "background_features": ["{{BACKGROUND_FEATURES}}"],
    "feats": ["{{FEATS}}"]
  },
  "attacks": [
    { "name": "{{WEAPON_1_NAME}}", "attack_bonus": "{{WEAPON_1_BONUS}}", "damage_and_type": "{{WEAPON_1_DAMAGE}}" }
  ],
  "spellcasting": {
    "spellcasting_ability": "{{SPELLCASTING_ABILITY}}",
    "spell_save_dc": "{{SPELL_SAVE_DC}}",
    "spell_attack_bonus": "{{SPELL_ATTACK_BONUS}}",
    "cantrips": ["{{CANTRIP_LIST}}"],
    "spell_slots": "{{SPELL_SLOTS_TABLE}}",
    "spells_prepared": ["{{SPELL_LIST}}"]
  },
  "equipment": {
    "armor": ["{{ARMOR_LIST}}"],
    "magic_items": ["{{MAGIC_ITEMS}}"],
    "general_equipment": ["{{GENERAL_EQUIPMENT}}"],
    "money": { 
      "copper": "{{CP_VALUE}}",
      "silver": "{{SP_VALUE}}",
      "electrum": "{{EP_VALUE}}",
      "gold": "{{GP_VALUE}}",
      "platinum": "{{PP_VALUE}}"
    }
  },
  "personality": {
    "trait": "{{PERSONALITY_TRAIT}}",
    "ideal": "{{IDEAL}}",
    "bond": "{{BOND}}",
    "flaw": "{{FLAW}}"
  },
  "backstory": "{{BACKSTORY}}",
  "appearance_and_style": {
    "image_alt": "{{CHARACTER_NAME}}",
    "image_file": "string",
    "image_prompt": "{{IMAGE_PROMPT}}",
    "physical_appearance": "{{APPEARANCE}}",
    "clothing_style": "{{CLOTHING_STYLE}}",
    "unique_accessories": "{{UNIQUE_ACCESSORIES}}",
    "signature_expression": "{{SIGNATURE_EXPRESSION}}"
  },
  "goals_and_motivations": {
    "main_goal": "{{MAIN_GOAL}}",
    "motivations": "{{MOTIVATIONS}}",
    "fears": "{{FEARS}}",
    "secrets": "{{SECRETS}}"
  },
  "game_notes": {
    "combat_behavior": "{{COMBAT_BEHAVIOR}}",
    "social_interactions": "{{SOCIAL_INTERACTIONS}}",
    "future_development": "{{FUTURE_DEVELOPMENT}}"
  },
  "spell_description": [
    {
      "id": "string",
      "name": "{{SPELL_NAME}}",
      "level": "{{SPELL_LEVEL}}",
      "school": "{{SPELL_SCHOOL}}",
      "casting_time": "{{SPELL_CASTING_TIME}}",
      "range": "{{SPELL_RANGE}}",
      "components": "{{SPELL_COMPONENTS}}",
      "duration": "{{SPELL_DURATION}}",
      "description": "{{SPELL_DESCRIPTION}}",
      "narrative": "{{SPELL_NARRATIVE}}"
    }
  ],
  "metadata": {
    "template_title": "string",
    "system": "D&D 5e",
    "locale": "pt-BR",
    "version": "1.4.0"
  }
}
