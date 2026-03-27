export const characterSchema = {
    type: 'object',
    required: ['character_name', 'race', 'class', 'level', 'attributes'],
    properties: {
        character_name: { type: 'string', minLength: 1 },
        race: { type: 'string' },
        class: { type: 'string' },
        level: { type: 'integer', minimum: 1, maximum: 20 },
        subclass: { type: 'string', nullable: true },
        basic_info: {
            type: 'object',
            properties: {
                full_name: { type: 'string' },
                archetype: { type: 'string' },
                background: { type: 'string' },
                alignment: { type: 'string' },
                inspiration: { type: 'boolean' }
            }
        },
        health_and_defense: {
            type: 'object',
            properties: {
                current_hp: { type: 'integer' },
                max_hp: { type: 'integer' },
                hit_dice: { type: 'string' },
                armor_class: { type: 'integer' },
                movement: { type: 'string' },
                initiative: { type: 'string' },
                resistances_immunities: { type: 'string' }
            }
        },
        attributes: {
            type: 'object',
            required: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
            properties: {
                strength: { type: 'object', properties: { value: { type: 'integer' }, modifier: { type: 'string' }, save: { type: 'string' } } },
                dexterity: { type: 'object', properties: { value: { type: 'integer' }, modifier: { type: 'string' }, save: { type: 'string' } } },
                constitution: { type: 'object', properties: { value: { type: 'integer' }, modifier: { type: 'string' }, save: { type: 'string' } } },
                intelligence: { type: 'object', properties: { value: { type: 'integer' }, modifier: { type: 'string' }, save: { type: 'string' } } },
                wisdom: { type: 'object', properties: { value: { type: 'integer' }, modifier: { type: 'string' }, save: { type: 'string' } } },
                charisma: { type: 'object', properties: { value: { type: 'integer' }, modifier: { type: 'string' }, save: { type: 'string' } } },
            }
        },
        proficiencies: {
            type: 'object',
            properties: {
                saving_throws: { type: 'array', items: { type: 'string' } },
                skill_proficiencies: { 
                    type: 'array', 
                    items: { 
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            attribute: { type: 'string' },
                            proficient: { type: 'boolean' },
                            expertise: { type: 'boolean' },
                            modifier: { type: 'string' }
                        }
                    } 
                },
                tools_and_languages: { type: 'array', items: { type: 'string' } }
            }
        },
        abilities_and_features: {
            type: 'object',
            properties: {
                racial_traits: { type: 'array', items: { type: 'string' } },
                class_features: { type: 'array', items: { type: 'string' } },
                background_features: { type: 'array', items: { type: 'string' } }
            }
        },
        attacks: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    attack_bonus: { type: 'string' },
                    damage_and_type: { type: 'string' }
                }
            }
        },
        spellcasting: {
            type: 'object',
            properties: {
                spellcasting_ability: { type: 'string' },
                spell_save_dc: { type: 'string' },
                spell_attack_bonus: { type: 'string' },
                cantrips: { type: 'array', items: { type: 'string' } },
                spells_prepared: { type: 'array', items: { type: 'string' } }
            }
        },
        equipment: {
            type: 'object',
            properties: {
                armor: { type: 'array', items: { type: 'string' } },
                magic_items: { type: 'array', items: { type: 'string' } },
                general_equipment: { type: 'array', items: { type: 'string' } },
                money: { type: 'object' }
            }
        },
        personality: {
            type: 'object',
            properties: {
                trait: { type: 'string' },
                ideal: { type: 'string' },
                bond: { type: 'string' },
                flaw: { type: 'string' }
            }
        },
        backstory: { type: 'string' },
        goals_and_motivations: {
            type: 'object',
            properties: {
                main_goal: { type: 'string' },
                motivations: { type: 'string' },
                fears: { type: 'string' },
                secrets: { type: 'string' }
            }
        },
        game_notes: {
            type: 'object',
            properties: {
                combat_behavior: { type: 'string' },
                social_interactions: { type: 'string' },
                future_development: { type: 'string' }
            }
        },
        metadata: { type: 'object' }
    },
    additionalProperties: true,
} as const;
