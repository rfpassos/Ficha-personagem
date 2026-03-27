import Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import type { CharacterInput } from '../types/character.types';

const SPELL_ART_DIR = path.join(__dirname, '../../assets/spells/art');

import { generateImage } from './image.service';
import { convertToRealismPrompt } from './realism.service';

import sharp from 'sharp';
import { StorageService } from './storage.service';

interface SpellEntry {
    name: string;
    id?: string;
}

function getCharacterSpells(character: CharacterInput): SpellEntry[] {
    const database = getSpellsDatabase();
    const synonyms = getSpellSynonyms();
    const spellMap = new Map<string, SpellEntry>();
    const seenNames = new Set<string>();

    // 1. Processar primeiro spell_description (tem mais informações e IDs resolvidos pela IA)
    if (character.spell_description) {
        for (const s of character.spell_description) {
            const normName = normalizeName(s.name);
            let resolvedId = s.id;
            
            // Tenta resolver ID pelo nome se vier vazio
            if (!resolvedId) {
                // Tenta biblioteca de sinônimos manual primeiro
                resolvedId = synonyms[s.name] || synonyms[normName];

                // Fallback para busca por nome normalizado no banco
                if (!resolvedId) {
                    const dbMatch = database.find(db => normalizeName(db.SpellName || '') === normName);
                    if (dbMatch?.id) resolvedId = dbMatch.id;
                }
            }

            const key = resolvedId || normName;
            if (!spellMap.has(key)) {
                spellMap.set(key, { name: s.name, id: resolvedId });
                seenNames.add(normName);
            }
        }
    }

    // 2. Processar spells_prepared (são apenas strings de nomes)
    if (character.spellcasting?.spells_prepared) {
        for (const name of character.spellcasting.spells_prepared) {
            const normName = normalizeName(name);
            
            // Tenta biblioteca de sinônimos manual primeiro
            let resolvedId = synonyms[name] || synonyms[normName];

            // Tenta resolver ID pelo banco se não estiver nos sinônimos
            if (!resolvedId) {
                const dbMatch = database.find(db => normalizeName(db.SpellName || '') === normName);
                resolvedId = dbMatch?.id;
            }

            const key = resolvedId || normName;

            // Se o ID ou Nome Normalizado já foi processado no passo 1, ignora
            if (spellMap.has(key) || seenNames.has(normName)) {
                continue;
            }

            spellMap.set(key, { name: name, id: resolvedId });
            seenNames.add(normName);
        }
    }

    return Array.from(spellMap.values());
}

export async function ensureSpellArts(character: CharacterInput) {
    const database = getSpellsDatabase();
    const spells = getCharacterSpells(character);

    for (const spell of spells) {
        // Usa o ID da magia como nome de arquivo, ou faz fallback para o nome formatado
        const cleanName = spell.id || spell.name.split('(')[0].trim().toLowerCase().replace(/\s+/g, '_');
        
        const jpgPath = path.join(SPELL_ART_DIR, `${cleanName}.jpg`);
        const pngPath = path.join(SPELL_ART_DIR, `${cleanName}.png`);
        
        // Se a magia já está baixada em disco local, pula
        if (fs.existsSync(jpgPath) || fs.existsSync(pngPath)) {
            continue;
        }

        // Tenta puxar do MinIO antes de gastar recursos da IA
        let minioBuffer = await StorageService.getSpellArtBuffer(`${cleanName}.jpg`);
        if (minioBuffer) {
            fs.writeFileSync(jpgPath, minioBuffer);
            continue;
        }

        minioBuffer = await StorageService.getSpellArtBuffer(`${cleanName}.png`);
        if (minioBuffer) {
            fs.writeFileSync(pngPath, minioBuffer);
            continue;
        }

        // Se realmente não existe (nem local, nem MinIO), gera uma nova imagem
        const normName = normalizeName(spell.name);
        const dbSpell = database.find(s => 
            (spell.id && s.id === spell.id) || 
            normalizeName(s.SpellName || '') === normName
        );
        
        if (dbSpell && dbSpell.BasePrompt) {
            console.log(`[template.service] Gerando arte nova para magia sob demanda: ${spell.name}`);
            try {
                const realismPrompt = await convertToRealismPrompt(dbSpell.BasePrompt, 'grimoire');
                const result = await generateImage(realismPrompt, { aspect_ratio: 'portrait_4_5' });
                
                const imgBuffer = Buffer.from(result.base64, 'base64');
                // Comprime para JPG 90%
                const compressedBuffer = await sharp(imgBuffer).jpeg({ quality: 90 }).toBuffer();
                
                // Salva na maquina local
                fs.writeFileSync(jpgPath, compressedBuffer);
                
                // Distribui no MinIO para as outras execuções
                await StorageService.uploadSpellArt(`${cleanName}.jpg`, compressedBuffer, 'image/jpeg');
                
                // Delay para não estourar rate limit da API
                await new Promise(r => setTimeout(r, 2000));
            } catch (err) {
                console.error(`[template.service] Erro gerando arte sob demanda de ${spell.name}:`, err);
            }
        }
    }
}

// Registra helpers do Handlebars (o helper 'modifier' original foi removido pois causava conflito com as chaves locais)

Handlebars.registerHelper('join', (arr: string[], sep: string) => {
    if (!Array.isArray(arr) || arr.length === 0) return '—';
    return arr.join(typeof sep === 'string' ? sep : ', ');
});

Handlebars.registerHelper('add', (a: number, b: number) => {
    return (Number(a) || 0) + (Number(b) || 0);
});

Handlebars.registerHelper('nl2br', function(text: unknown) {
    if (typeof text !== 'string') return '';
    return new Handlebars.SafeString(text.replace(/\n/g, '<br />'));
});

Handlebars.registerHelper('default', (value: unknown, fallback: string) => {
    return value ?? fallback;
});

const TEMPLATE_PATH = path.join(__dirname, '../../../assets/templates/dnd-landscape-hero.html');
const SPELLS_DATA_PATH = path.join(__dirname, '../../assets/data/magias-dnd-ptbr.json');
const SYNONYMS_PATH = path.join(__dirname, '../../assets/data/spell-synonyms.json');

let compiledTemplate: HandlebarsTemplateDelegate | null = null;
let spellsDatabase: any[] | null = null;
let spellSynonyms: Record<string, string> | null = null;

function getSpellsDatabase() {
    if (!spellsDatabase) {
        if (fs.existsSync(SPELLS_DATA_PATH)) {
            const rawData = fs.readFileSync(SPELLS_DATA_PATH, 'utf-8');
            spellsDatabase = JSON.parse(rawData);
        } else {
            console.warn(`[template.service] Banco de magias não encontrado em: ${SPELLS_DATA_PATH}`);
            spellsDatabase = [];
        }
    }
    return spellsDatabase || [];
}

function getSpellSynonyms(): Record<string, string> {
    if (!spellSynonyms) {
        if (fs.existsSync(SYNONYMS_PATH)) {
            spellSynonyms = JSON.parse(fs.readFileSync(SYNONYMS_PATH, 'utf-8'));
        } else {
            spellSynonyms = {};
        }
    }
    return spellSynonyms || {};
}

function normalizeName(name: string): string {
    // Remove conteúdo entre parênteses (como "(Shield)") e normaliza texto
    const cleanName = name.replace(/\s*\(.*?\)\s*/g, ' ').trim();
    return cleanName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function getTemplate(): HandlebarsTemplateDelegate {
    if (!fs.existsSync(TEMPLATE_PATH)) {
        throw new Error(`Template não encontrado em: ${TEMPLATE_PATH}`);
    }
    const templateSource = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
    return Handlebars.compile(templateSource);
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
        background: character.basic_info?.background || '—',
        alignment: character.basic_info?.alignment || '—',
        
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

        // Mapeamento de Notas de Jogo (Garantindo que os campos cheguem com os nomes que o template espera)
        game_notes: {
            combat_behavior: character.game_notes?.combat_behavior || '—',
            social_interactions: character.game_notes?.social_interactions || '—',
            future_development: character.game_notes?.future_development || '—',
            notes: '—'
        },

        // Mapeamento de Moedas (JSON: gold, copper, silver, electrum, platinum -> Template: gp, cp, sp, ep, pp)
        equipment: {
            ...character.equipment,
            money: {
                copper: character.equipment?.money?.copper || 0,
                silver: character.equipment?.money?.silver || 0,
                electrum: character.equipment?.money?.electrum || 0,
                gold: character.equipment?.money?.gold || 0,
                platinum: character.equipment?.money?.platinum || 0,
                // Mantém aliases se necessário
                cp: character.equipment?.money?.copper || 0,
                sp: character.equipment?.money?.silver || 0,
            }
        },

        personality: character.personality || {
            trait: '',
            ideal: '',
            bond: '',
            flaw: ''
        },
        personality_traits: character.personality?.trait || '',
        
        backstory_pages: paginateBackstory(character.backstory || '—'),
        
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
        
        spell_card_pages: paginateSpells(character, imageBase64),
        
        // Enriquece o spell_description com dados do banco e pagina para a página 4 (Descrições do Grimório)
        spell_description_pages: paginateSpellDescriptions(
            getCharacterSpells(character),
            getSpellsDatabase()
        )
    };

    console.log(`[template.service] Renderizando ficha para ${character.character_name}`);
    console.log(`[template.service] Total de magias preparadas: ${character.spellcasting?.spells_prepared?.length || 0}`);
    console.log(`[template.service] Total de páginas de cards de magia: ${data.spell_card_pages.length}`);
    console.log(`[template.service] Total de páginas de biografia: ${data.backstory_pages.length}`);

    return template(data);
}

// Carrega a arte de uma magia do diretório de artes, ou usa a arte do personagem como fallback
function getSpellArt(spellName: string, fallbackBase64: string): string {
    const cleanName = spellName.split('(')[0].trim().toLowerCase().replace(/\s+/g, '_');
    
    // Procura primeiro pelo JPG comprimido
    const jpgPath = path.join(SPELL_ART_DIR, `${cleanName}.jpg`);
    if (fs.existsSync(jpgPath)) {
        const buf = fs.readFileSync(jpgPath);
        return `data:image/jpeg;base64,${buf.toString('base64')}`;
    }

    // Procura legado PNG
    const pngPath = path.join(SPELL_ART_DIR, `${cleanName}.png`);
    if (fs.existsSync(pngPath)) {
        const buf = fs.readFileSync(pngPath);
        return `data:image/png;base64,${buf.toString('base64')}`;
    }
    
    // Fallback para a imagem do personagem
    return `data:image/png;base64,${fallbackBase64}`;
}


function paginateSpells(character: CharacterInput, artBase64: string) {
    const pages = [];
    const itemsPerPage = 4;
    
    // Captura as magias unificando nomes e IDs
    const spells = getCharacterSpells(character);
        
    const database = getSpellsDatabase();
    
    for (let i = 0; i < spells.length; i += itemsPerPage) {
        const pageSpells = spells.slice(i, i + itemsPerPage);
        
        pages.push({
            frontRow: pageSpells.map(spell => ({
                name: spell.name,
                art: getSpellArt(spell.id || spell.name, artBase64)
            })),
            backRow: pageSpells.map(spell => {
                // Tenta achar pelo ID oficial, ou faz fallback para nome aproximado
                const normName = normalizeName(spell.name);
                const dbSpell = database.find(s => 
                    (spell.id && s.id === spell.id) || 
                    normalizeName(s.SpellName || '') === normName
                );
                
                if (dbSpell) {
                    const levelStr = String(dbSpell.Level) === '0' || String(dbSpell.Level).toLowerCase() === 'truque'
                        ? 'Truque' : `Nível ${dbSpell.Level}`;
                    
                    const classesArr = Array.isArray(dbSpell.Classes) ? dbSpell.Classes : [];
                    const classList = classesArr.length > 0 ? classesArr.join(', ') : '';

                    const parts: string[] = [];
                    if (dbSpell.Verbal) parts.push('V');
                    if (dbSpell.Somatic) parts.push('S');
                    if (dbSpell.Material) parts.push(`M (${dbSpell.Material})`);
                    const components = parts.join(', ') || 'Nenhum';
                    
                    return {
                        name: spell.name,
                        level: levelStr,
                        school: dbSpell.School || '—',
                        classes: classList,
                        casting_time: dbSpell.Time || dbSpell.CastingTime || '—',
                        range: dbSpell.Reach || dbSpell.Range || '—',
                        components,
                        duration: dbSpell.Duration || '—',
                        concentration: dbSpell.Concentration ? 'Conc.' : '',
                        description: dbSpell.VisualDescription || dbSpell.Description || 'Descrição não disponível.',
                        narrative: dbSpell.BasePrompt || ''
                    };
                }

                // Fallback para magia não encontrada
                return {
                    name: spell.name,
                    level: '—',
                    school: '—',
                    casting_time: '—',
                    range: '—',
                    description: 'Magia não encontrada no compêndio local.',
                    narrative: ''
                };
            })
        });
    }
    return pages;
}

function paginateSpellDescriptions(spellNames: SpellEntry[], database: any[]) {
    const pages = [];
    const MAX_CHARS_FIRST_PAGE = 1800; // 1 coluna dividindo com seção "Habilidades de Raça e Classe"
    const MAX_CHARS_SUBSEQUENT_PAGE = 4500; // 2 colunas amplas (full width) dividindo entre si
    
    let currentSpells = [];
    let currentChars = 0;
    let isFirstPage = true;
    let pageIndex = 1;

    for (let i = 0; i < spellNames.length; i++) {
        const spell = spellNames[i];
        const normName = normalizeName(spell.name);
        const db = database.find(s => 
            (spell.id && s.id === spell.id) || 
            normalizeName(s.SpellName || '') === normName
        );
        
        let descText = spell.name;
        let dbSpell: any = null;

        if (!db) {
            dbSpell = { name: spell.name, level: '—', school: '—', casting_time: '—', range: '—', components: '—', duration: '—', description: 'Magia não encontrada no compêndio local.', narrative: '' };
        } else {
            const levelStr = String(db.Level) === '0' || String(db.Level).toLowerCase() === 'truque'
                ? 'Truque' : `Nível ${db.Level}`;
            const parts: string[] = [];
            if (db.Verbal) parts.push('V');
            if (db.Somatic) parts.push('S');
            if (db.Material) parts.push('M');
            
            descText = db.Description || db.VisualDescription || '—';

            dbSpell = {
                name: spell.name,
                level: levelStr,
                school: db.School || '—',
                casting_time: db.Time || db.CastingTime || '—',
                range: db.Reach || db.Range || '—',
                components: parts.join(', ') || '—',
                duration: db.Duration || '—',
                description: descText,
                narrative: db.BasePrompt || ''
            };
        }

        // Estima tamanho em caracteres (+overhead de 250 pro cabeçalho de cada card de magia na página de leitura)
        const spellCharCost = descText.length + 250;
        const pageLimit = isFirstPage ? MAX_CHARS_FIRST_PAGE : MAX_CHARS_SUBSEQUENT_PAGE;
        
        // Se exceder a carga cognitiva máxima da página, empurra pra uma página nova (salvo se a página original estiver vazia)
        if (currentChars + spellCharCost > pageLimit && currentSpells.length > 0) {
            pages.push({
                isFirstPage,
                spells: currentSpells,
                pageIndex: pageIndex
            });
            isFirstPage = false;
            pageIndex++;
            currentSpells = [];
            currentChars = 0;
        }

        currentSpells.push(dbSpell);
        currentChars += spellCharCost;
    }
    
    if (currentSpells.length > 0) {
        pages.push({
            isFirstPage,
            spells: currentSpells,
            pageIndex: pageIndex
        });
    }
    
    return pages;
}
function paginateBackstory(backstory: string) {
    const pages = [];
    const MAX_CHARS_PER_PAGE = 2400; // Limite aproximado para caber na seção lateral da página 2

    if (!backstory || backstory === '—') {
        pages.push({ text: '—', pageIndex: 1, isFirstPage: true });
        return pages;
    }

    // Se for pequeno, apenas uma página
    if (backstory.length <= MAX_CHARS_PER_PAGE) {
        pages.push({ text: backstory, pageIndex: 1, isFirstPage: true });
        return pages;
    }

    // Divide o texto em parágrafos para evitar cortes no meio de frases
    const paragraphs = backstory.split('\n');
    let currentText = '';
    let pageIndex = 1;

    for (const p of paragraphs) {
        if (currentText.length + p.length > MAX_CHARS_PER_PAGE && currentText.length > 0) {
            pages.push({
                text: currentText.trim(),
                pageIndex,
                isFirstPage: pageIndex === 1
            });
            currentText = '';
            pageIndex++;
        }
        currentText += p + '\n';
    }

    if (currentText.trim().length > 0) {
        pages.push({
            text: currentText.trim(),
            pageIndex,
            isFirstPage: pageIndex === 1
        });
    }

    return pages;
}
