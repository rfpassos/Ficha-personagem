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

let compiledTemplate: HandlebarsTemplateDelegate | null = null;

function getTemplate(): HandlebarsTemplateDelegate {
    if (!compiledTemplate) {
        const templatePath = path.join(__dirname, '..', 'templates', 'sheet.hbs');
        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        compiledTemplate = Handlebars.compile(templateSource);
    }
    return compiledTemplate;
}

export function renderSheetHtml(
    character: CharacterInput,
    imageBase64: string
): string {
    const template = getTemplate();

    const data = {
        ...character,
        imageDataUri: `data:image/png;base64,${imageBase64}`,
        habilidades: character.habilidades ?? [],
        magias: character.magias ?? [],
        equipamentos: character.equipamentos ?? [],
        historia: character.historia ?? '',
        background: character.background ?? '',
        alinhamento: character.alinhamento ?? '',
        aparencia: character.aparencia ?? '',
        personalidade: character.personalidade ?? '',
        pontos_de_vida: character.pontos_de_vida ?? '—',
        classe_armadura: character.classe_armadura ?? '—',
    };

    return template(data);
}

