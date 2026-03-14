import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import dotenv from 'dotenv';
import { generatePdfFromHtml } from '../services/pdf.service';
import { generateCharacterImage } from '../services/image.service';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// ── Helpers do Handlebars ──────────────────────────────────────────────────
// NOTA: Não registramos helper 'modifier' pois o nome conflita com a propriedade
// 'modifier' dos objetos attributes_formatted e saving_throws no template.
// Os valores já vêm pré-calculados como strings (ex: "+2", "-1") no buildTemplateData.
Handlebars.registerHelper('calcMod', (value: number) => {
    const mod = Math.floor((value - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
});
if (!Handlebars.helpers['join']) {
    Handlebars.registerHelper('join', (arr: string[], sep: string) => {
        if (!Array.isArray(arr) || arr.length === 0) return '—';
        return arr.join(typeof sep === 'string' ? sep : ', ');
    });
}
if (!Handlebars.helpers['default']) {
    Handlebars.registerHelper('default', (value: unknown, fallback: string) => {
        return value ?? fallback;
    });
}

// ── Normaliza o JSON rico para o formato esperado pelo template ─────────────
function buildTemplateData(json: any, imageBase64: string): any {
    const attr = json.attributes;

    // Helper para converter modifier string ("+2", "-1") → number
    const parseMod = (s: string | number) => {
        if (typeof s === 'number') return s;
        return parseInt(String(s).replace('+', ''), 10);
    };

    // Formata atributos no formato {key, value, modifier} esperado pelo template
    const attrNames: Record<string, string> = {
        strength: 'FOR', dexterity: 'DES', constitution: 'CON',
        intelligence: 'INT', wisdom: 'SAB', charisma: 'CAR'
    };
    const attributes_formatted = Object.entries(attr).map(([key, val]: [string, any]) => ({
        key: attrNames[key] ?? key,
        value: val.value,
        modifier: val.modifier, // já é string como "+2"
    }));

    // Saving Throws: formata com proficiência
    const savingThrowsProficient = json.proficiencies?.saving_throws ?? [];
    const saving_throws = [
        { name: 'FOR', modifier: attr.strength.save, proficient: savingThrowsProficient.includes('Força') },
        { name: 'DES', modifier: attr.dexterity.save, proficient: savingThrowsProficient.includes('Destreza') },
        { name: 'CON', modifier: attr.constitution.save, proficient: savingThrowsProficient.includes('Constituição') },
        { name: 'INT', modifier: attr.intelligence.save, proficient: savingThrowsProficient.includes('Inteligência') },
        { name: 'SAB', modifier: attr.wisdom.save, proficient: savingThrowsProficient.includes('Sabedoria') },
        { name: 'CAR', modifier: attr.charisma.save, proficient: savingThrowsProficient.includes('Carisma') },
    ];

    // Sentidos passivos: busca da lista de perícias (mais preciso)
    const skills: any[] = json.proficiencies?.skill_proficiencies ?? [];
    const getSkillMod = (name: string): number => {
        const s = skills.find((sk: any) => sk.name === name);
        return s ? parseMod(s.modifier) : parseMod(attr.wisdom.modifier);
    };
    const passive_perception   = 10 + getSkillMod('Percepção');
    const passive_investigation = 10 + getSkillMod('Investigação');
    const passive_insight      = 10 + getSkillMod('Intuição');

    // Monta pages de spell cards (4 por página)
    const spells: any[] = json.spell_description ?? [];
    const CARDS_PER_PAGE = 4;
    const spell_card_pages: any[] = [];
    for (let i = 0; i < spells.length; i += CARDS_PER_PAGE) {
        const chunk = spells.slice(i, i + CARDS_PER_PAGE);
        const frontRow = chunk.map((spell: any) => ({
            ...spell,
            art: spell.art ?? '', // arte individual da carta (opcional)
        }));
        spell_card_pages.push({ frontRow, backRow: chunk });
    }

    // features_and_traits mapeando o JSON rico
    const features_and_traits = {
        racial_traits: json.abilities_and_features?.racial_traits ?? [],
        class_features: json.abilities_and_features?.class_features ?? [],
    };

    // Dados físicos da Morrigan (enriquecidos no build)
    const appearance_enriched = {
        ...json.appearance_and_style,
        age: 'Imortal (aparência ~25)',
        height: '1,72m',
        weight: '52kg',
        eyes: 'Verde vibrante',
        hair: 'Verde longa',
        skin: 'Clara',
        image_file: imageBase64 ? `data:image/png;base64,${imageBase64}` : json.appearance_and_style?.image_file,
    };

    return {
        ...json,
        subclass: json.basic_info?.archetype ?? '',
        health_and_defense: {
            ...json.health_and_defense,
            hp_current: json.health_and_defense.current_hp,
        },
        armor_class: json.health_and_defense.armor_class,
        initiative: json.health_and_defense.initiative,
        speed: (json.health_and_defense.movement ?? '9').replace(/m.*/, '').trim(),
        attributes_formatted,
        saving_throws,
        passive_perception,
        passive_investigation,
        passive_insight,
        feats: [],
        personality_traits: json.personality?.trait ?? '',
        features_and_traits,
        spell_card_pages,
        appearance_and_style: appearance_enriched,
        // Alias para proficiências de itens
        proficiencies: {
            ...json.proficiencies,
            armor_proficiencies: 'Nenhuma (Armadura de Sombras)',
            weapon_proficiencies: 'Armas Simples, Bestas de Mão',
        },
    };
}


// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
    console.log('--- 🧙‍♀️ Gerando Ficha Completa (Landscape Hero): Morrigan Aensland ---');

    // 1. Carrega o JSON da Morrigan
    const jsonPath = path.resolve(__dirname, '../../../assets/sheets/Morrigan Aensland-DnD.json');
    const sheetData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    // 2. Carrega o template landscape-hero
    const templatePath = path.resolve(__dirname, '../../../assets/templates/dnd-landscape-hero.html');
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template = Handlebars.compile(templateSource);

    // 3. Gerar Imagem
    console.log('\n[1/3] Gerando imagem do personagem via Gemini...');
    let imageBase64 = '';
    let imageSource = 'NONE';

    // Verifica se o portrait já existe para evitar regerar
    const portraitPath = path.resolve(__dirname, '../../../assets/sheets/Morrigan Aensland-portrait.png');
    if (fs.existsSync(portraitPath)) {
        console.log('   Portrait existente encontrado, reutilizando...');
        imageBase64 = fs.readFileSync(portraitPath).toString('base64');
        imageSource = 'CACHE';
    } else {
        try {
            const directPrompt = sheetData.appearance_and_style.image_prompt;
            const imgResult = await generateCharacterImage(directPrompt);
            imageBase64 = imgResult.base64;
            imageSource = imgResult.source;
            fs.writeFileSync(portraitPath, Buffer.from(imageBase64, 'base64'));
        } catch (err: any) {
            console.warn('⚠️ Falha na imagem:', err.message);
        }
    }
    console.log(`✅ Imagem: ${imageSource} (${Math.round(Buffer.from(imageBase64, 'base64').length / 1024)}KB)`);

    // 4. Prepara dados para o template
    console.log('\n[2/3] Adaptando dados para o template landscape-hero...');
    const templateData = buildTemplateData(sheetData, imageBase64);

    // 5. Renderiza HTML
    const html = template(templateData);
    console.log('✅ HTML renderizado.');

    // Salva o HTML para inspeção visual
    const htmlPath = path.resolve(__dirname, '../../../assets/sheets/Morrigan Aensland-DnD-landscape.html');
    fs.writeFileSync(htmlPath, html, 'utf-8');
    console.log(`   HTML salvo para revisão: assets/sheets/Morrigan Aensland-DnD-landscape.html`);

    // 6. Gerar PDF
    console.log('\n[3/3] Gerando PDF (múltiplas páginas A4 landscape)...');
    const pdfBuffer = await generatePdfFromHtml(html, {
        landscape: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    const outputPath = path.resolve(__dirname, '../../../assets/sheets/Morrigan Aensland-DnD-landscape.pdf');
    fs.writeFileSync(outputPath, pdfBuffer);

    console.log(`\n✨ Ficha landscape gerada com sucesso!`);
    console.log(`   📄 PDF: assets/sheets/Morrigan Aensland-DnD-landscape.pdf (${Math.round(pdfBuffer.length / 1024)}KB)`);
}

main().catch(err => {
    console.error('\n❌ Falha:', err.message || err);
    process.exit(1);
});
