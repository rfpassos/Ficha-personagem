import Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import type { CharacterInput } from '../types/character.types';

// Registra helpers do Handlebars (o helper 'modifier' original foi removido pois causava conflito com as chaves locais)

Handlebars.registerHelper('join', (arr: string[], sep: string) => {
    if (!Array.isArray(arr) || arr.length === 0) return '—';
    return arr.join(typeof sep === 'string' ? sep : ', ');
});

Handlebars.registerHelper('default', (value: unknown, fallback: string) => {
    return value ?? fallback;
});

const TEMPLATE_PATH = path.join(__dirname, '../../../assets/templates/dnd-landscape-hero.html');
let compiledTemplate: HandlebarsTemplateDelegate | null = null;

function getTemplate(): HandlebarsTemplateDelegate {
    if (!compiledTemplate) {
        if (!fs.existsSync(TEMPLATE_PATH)) {
            throw new Error(`Template não encontrado em: ${TEMPLATE_PATH}`);
        }
        const templateSource = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
        compiledTemplate = Handlebars.compile(templateSource);
    }
    return compiledTemplate;
}

// Funções utilitárias para cálculos de D&D 5e
function calculateModifier(value: number): number {
    return Math.floor(((value || 10) - 10) / 2);
}

function formatModifier(mod: number): string {
    return mod >= 0 ? `+${mod}` : `${mod}`;
}

function getProficiencyBonus(level: number): number {
    return Math.ceil((level || 1) / 4) + 1;
}

export function renderSheetHtml(
    character: CharacterInput,
    imageBase64: string
): string {
    const template = getTemplate();

    const level = character.level || 1;
    const profBonus = getProficiencyBonus(level);

    // Mapeamento de atributos para facilitar o cálculo (Garante que sejam números)
    const attrValues: Record<string, number> = {
        strength: Number(character.attributes?.strength?.value) || 10,
        dexterity: Number(character.attributes?.dexterity?.value) || 10,
        constitution: Number(character.attributes?.constitution?.value) || 10,
        intelligence: Number(character.attributes?.intelligence?.value) || 10,
        wisdom: Number(character.attributes?.wisdom?.value) || 10,
        charisma: Number(character.attributes?.charisma?.value) || 10,
    };

    const attrMods: Record<string, number> = {};
    Object.keys(attrValues).forEach(key => {
        attrMods[key] = calculateModifier(attrValues[key]);
    });

    // Mapeamento rico para o template landscape-hero
    const data = {
        ...character,
        // Campos que o template espera com nomes diferentes ou calculados
        subclass: character.subclass || character.basic_info?.archetype || '—',
        armor_class: character.health_and_defense?.armor_class || 10,
        initiative: character.health_and_defense?.initiative || formatModifier(attrMods.dexterity),
        speed: (character.health_and_defense?.movement || '9').replace(/[^0-9.]/g, ''), // Pega só o número se vier "9m"
        
        health_and_defense: {
            ...character.health_and_defense,
            hp_current: character.health_and_defense?.current_hp || character.health_and_defense?.max_hp || 0,
        },
        
        spellcasting: {
            ...character.spellcasting,
            spells_prepared: character.spellcasting?.spells_prepared?.length 
                ? character.spellcasting.spells_prepared 
                : (character.spell_description?.map(s => s.name) || [])
        },
        
        appearance_and_style: {
            ...character.appearance_and_style,
            image_file: `data:image/png;base64,${imageBase64}`
        },

        personality_traits: character.personality?.trait || '',
        
        // Mapeia para o nome que o template espera
        features_and_traits: {
            racial_traits: character.abilities_and_features?.racial_traits || [],
            class_features: character.abilities_and_features?.class_features || [],
            background_features: character.abilities_and_features?.background_features || [],
        },

        // Talentos (explicitamente no topo no template)
        feats: character.abilities_and_features?.feats || [],
        
        // Recalcula atributos para garantir que não haja NaN
        attributes_formatted: [
            { key: 'FOR', value: attrValues.strength, modifier: formatModifier(attrMods.strength) },
            { key: 'DES', value: attrValues.dexterity, modifier: formatModifier(attrMods.dexterity) },
            { key: 'CON', value: attrValues.constitution, modifier: formatModifier(attrMods.constitution) },
            { key: 'INT', value: attrValues.intelligence, modifier: formatModifier(attrMods.intelligence) },
            { key: 'SAB', value: attrValues.wisdom, modifier: formatModifier(attrMods.wisdom) },
            { key: 'CAR', value: attrValues.charisma, modifier: formatModifier(attrMods.charisma) },
        ],

        // Recalcula Salvaguardas (Saving Throws)
        saving_throws: [
            { name: 'FOR', proficient: character.proficiencies?.saving_throws?.includes('strength'), modifier: '' },
            { name: 'DES', proficient: character.proficiencies?.saving_throws?.includes('dexterity'), modifier: '' },
            { name: 'CON', proficient: character.proficiencies?.saving_throws?.includes('constitution'), modifier: '' },
            { name: 'INT', proficient: character.proficiencies?.saving_throws?.includes('intelligence'), modifier: '' },
            { name: 'SAB', proficient: character.proficiencies?.saving_throws?.includes('wisdom'), modifier: '' },
            { name: 'CAR', proficient: character.proficiencies?.saving_throws?.includes('charisma'), modifier: '' },
        ].map(st => {
            const attrKey = st.name === 'FOR' ? 'strength' : 
                          st.name === 'DES' ? 'dexterity' :
                          st.name === 'CON' ? 'constitution' :
                          st.name === 'INT' ? 'intelligence' :
                          st.name === 'SAB' ? 'wisdom' : 'charisma';
            const total = attrMods[attrKey] + (st.proficient ? profBonus : 0);
            return { ...st, modifier: formatModifier(total) };
        }),

        // Recalcula Perícias (Skills)
        proficiencies: {
            ...character.proficiencies,
            skill_proficiencies: (character.proficiencies?.skill_proficiencies || []).map(skill => {
                const attrKey = (skill.attribute || 'wisdom').toLowerCase();
                const fullAttrKey = attrKey.includes('for') ? 'strength' :
                                   attrKey.includes('des') ? 'dexterity' :
                                   attrKey.includes('con') ? 'constitution' :
                                   attrKey.includes('int') ? 'intelligence' :
                                   attrKey.includes('sab') ? 'wisdom' :
                                   attrKey.includes('car') ? 'charisma' : attrKey;
                
                const baseMod = attrMods[fullAttrKey] || 0;
                const bonus = (skill.proficient ? profBonus : 0) + (skill.expertise ? profBonus : 0);
                return {
                    ...skill,
                    modifier: formatModifier(baseMod + bonus)
                };
            })
        },

        // Passíveis recalculados
        passive_perception: 10 + attrMods.wisdom + ((character.proficiencies?.skill_proficiencies || []).find(s => s.name.toLowerCase().includes('percepção'))?.proficient ? profBonus : 0),
        passive_investigation: 10 + attrMods.intelligence + ((character.proficiencies?.skill_proficiencies || []).find(s => s.name.toLowerCase().includes('investigação'))?.proficient ? profBonus : 0),
        passive_insight: 10 + attrMods.wisdom + ((character.proficiencies?.skill_proficiencies || []).find(s => s.name.toLowerCase().includes('intuição'))?.proficient ? profBonus : 0),
        
        spell_card_pages: paginateSpells(character, imageBase64)
    };

    console.log(`[template.service] Renderizando ficha para ${character.character_name}`);
    console.log(`[template.service] Total de magias preparadas: ${character.spellcasting?.spells_prepared?.length || 0}`);
    console.log(`[template.service] Total de páginas de cards de magia: ${data.spell_card_pages.length}`);

    return template(data);
}

function paginateSpells(character: CharacterInput, artBase64: string) {
    const pages = [];
    const itemsPerPage = 4;
    const spells = character.spellcasting.spells_prepared;
    const descriptions = character.spell_description || [];
    
    for (let i = 0; i < spells.length; i += itemsPerPage) {
        const pageSpells = spells.slice(i, i + itemsPerPage);
        pages.push({
            frontRow: pageSpells.map(name => ({ name, art: `data:image/png;base64,${artBase64}` })),
            backRow: pageSpells.map(name => {
                const desc = descriptions.find(d => d.name.toLowerCase() === name.toLowerCase());
                return {
                    name,
                    level: desc?.level || '—',
                    school: desc?.school || '—',
                    casting_time: desc?.casting_time || '—',
                    range: desc?.range || '—',
                    description: desc?.description || 'Descrição não disponível.',
                    narrative: desc?.narrative || ''
                };
            })
        });
    }
    return pages;
}

