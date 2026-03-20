import Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import type { CharacterInput } from '../types/character.types';

// Registra helpers do Handlebars
Handlebars.registerHelper('modifier', (value: number) => {
    const mod = Math.floor((value - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
});

Handlebars.registerHelper('join', (arr: string[], sep: string) => {
    if (!Array.isArray(arr) || arr.length === 0) return '—';
    return arr.join(typeof sep === 'string' ? sep : ', ');
});

Handlebars.registerHelper('default', (value: unknown, fallback: string) => {
    return value ?? fallback;
});

const TEMPLATE_PATH = path.join(__dirname, '../../assets/templates/dnd-landscape-hero.html');
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

export function renderSheetHtml(
    character: CharacterInput,
    imageBase64: string
): string {
    const template = getTemplate();

    // Mapeamento rico para o template landscape-hero
    const data = {
        ...character,
        appearance_and_style: {
            ...character.appearance_and_style,
            // Injeta a imagem base64 diretamente se for passada
            image_file: `data:image/png;base64,${imageBase64}`
        },
        // Helpers para garantir que campos opcionais não quebrem o template
        attributes_formatted: [
            { key: 'FOR', value: character.attributes.strength.value, modifier: character.attributes.strength.modifier },
            { key: 'DES', value: character.attributes.dexterity.value, modifier: character.attributes.dexterity.modifier },
            { key: 'CON', value: character.attributes.constitution.value, modifier: character.attributes.constitution.modifier },
            { key: 'INT', value: character.attributes.intelligence.value, modifier: character.attributes.intelligence.modifier },
            { key: 'SAB', value: character.attributes.wisdom.value, modifier: character.attributes.wisdom.modifier },
            { key: 'CAR', value: character.attributes.charisma.value, modifier: character.attributes.charisma.modifier },
        ],
        saving_throws: [
            { name: 'FOR', modifier: character.attributes.strength.save, proficient: character.proficiencies.saving_throws.includes('strength') },
            { name: 'DES', modifier: character.attributes.dexterity.save, proficient: character.proficiencies.saving_throws.includes('dexterity') },
            { name: 'CON', modifier: character.attributes.constitution.save, proficient: character.proficiencies.saving_throws.includes('constitution') },
            { name: 'INT', modifier: character.attributes.intelligence.save, proficient: character.proficiencies.saving_throws.includes('intelligence') },
            { name: 'SAB', modifier: character.attributes.wisdom.save, proficient: character.proficiencies.saving_throws.includes('wisdom') },
            { name: 'CAR', modifier: character.attributes.charisma.save, proficient: character.proficiencies.saving_throws.includes('charisma') },
        ],
        // Passíveis (se a IA não extrair, calculamos o básico)
        passive_perception: 10 + (parseInt(character.attributes.wisdom.modifier) || 0),
        passive_investigation: 10 + (parseInt(character.attributes.intelligence.modifier) || 0),
        passive_insight: 10 + (parseInt(character.attributes.wisdom.modifier) || 0),
        
        // Magias paginadas para o template (4 cards por página)
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

