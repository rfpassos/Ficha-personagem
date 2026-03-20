export interface CharacterAttributes {
    strength: { value: number; modifier: string; save: string };
    dexterity: { value: number; modifier: string; save: string };
    constitution: { value: number; modifier: string; save: string };
    intelligence: { value: number; modifier: string; save: string };
    wisdom: { value: number; modifier: string; save: string };
    charisma: { value: number; modifier: string; save: string };
}

export interface CharacterInput {
    character_name: string;
    race: string;
    class: string;
    level: number;
    basic_info: {
        archetype: string;
        background: string;
        alignment: string;
    };
    health_and_defense: {
        current_hp: number;
        max_hp: number;
        hit_dice: string;
        armor_class: number;
        movement: string;
        initiative: string;
        resistances_immunities: string;
    };
    attributes: CharacterAttributes;
    proficiencies: {
        saving_throws: string[];
        skill_proficiencies: {
            name: string;
            attribute: string;
            proficient: boolean;
            expertise: boolean;
            modifier: string;
        }[];
        tools_and_languages: string[];
    };
    abilities_and_features: {
        racial_traits: string[];
        class_features: string[];
        background_features: string[];
    };
    attacks: {
        name: string;
        attack_bonus: string;
        damage_and_type: string;
    }[];
    spellcasting: {
        spellcasting_ability: string;
        spell_save_dc: string;
        spell_attack_bonus: string;
        cantrips: string[];
        spell_slots: string;
        spells_prepared: string[];
    };
    equipment: {
        armor: string[];
        magic_items: string[];
        general_equipment: string[];
        money: {
            gold: number;
        };
    };
    personality: {
        trait: string;
        ideal: string;
        bond: string;
        flaw: string;
    };
    backstory: string;
    appearance_and_style: {
        physical_appearance: string;
        clothing_style: string;
        age?: string;
        height?: string;
        weight?: string;
        eyes?: string;
        hair?: string;
        skin?: string;
        image_file?: string;
    };
    goals_and_motivations: {
        main_goal: string;
        motivations: string;
    };
    game_notes: {
        combat_behavior: string;
        social_interactions: string;
    };
    spell_description: {
        name: string;
        level: string;
        school: string;
        casting_time: string;
        range: string;
        description: string;
        narrative: string;
    }[];
    metadata: {
        template_title: string;
        version: string;
    };
}
