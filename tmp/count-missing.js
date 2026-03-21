const fs = require('fs');
const path = require('path');

const TSV_PATH = path.join(__dirname, '../assets/templates/Lista e Descrições de Magias D&D - D&D.tsv');
const JSON_PATH = path.join(__dirname, '../api/assets/data/magias-dnd-ptbr.json');

function clean(name) {
    if (!name) return "";
    return name.trim()
        .toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/\(.*\)/g, '') 
        .replace(/-/g, ' ')      
        .replace(/  +/g, ' ')    
        .trim();
}

function compare() {
    const tsvContent = fs.readFileSync(TSV_PATH, 'utf-8');
    const lines = tsvContent.split('\n').filter(line => line.trim() !== '');
    
    const tsvSpells = new Set();
    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split('\t');
        if (columns[1]) tsvSpells.add(columns[1].trim());
    }

    const jsonContent = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
    const jsonNames = new Set(jsonContent.map(s => clean(s.SpellName)));

    let missingCount = 0;
    const missingList = [];

    for (const name of tsvSpells) {
        if (!jsonNames.has(clean(name))) {
            missingCount++;
            missingList.push(name);
        }
    }

    console.log(`TOTAL_TSV: ${tsvSpells.size}`);
    console.log(`TOTAL_JSON: ${jsonContent.length}`);
    console.log(`MISSING: ${missingCount}`);
    console.log('--- AMOSTRA FALTANTE ---');
    console.log(missingList.slice(0, 15).join(', '));
}

compare();
