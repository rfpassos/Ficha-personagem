const fs = require('fs');

const normalize = (str) => {
    if (!str) return '';
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
};

const tsvPath = 'c:\\Projetos\\Ficha-personagem\\assets\\templates\\Lista e Descrições de Magias D&D - D&D.tsv';
const jsonPath = 'c:\\Projetos\\Ficha-personagem\\api\\assets\\data\\magias-dnd-ptbr.json';

const tsvData = fs.readFileSync(tsvPath, 'utf8');
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const tsvLines = tsvData.split(/\r?\n/);
// Skip header
const tsvSpells = {};
for (let i = 1; i < tsvLines.length; i++) {
    const line = tsvLines[i];
    if (!line.trim()) continue;
    const cols = line.split('\t');
    if (cols.length >= 5) {
        const name = normalize(cols[1]);
        tsvSpells[name] = {
            visualDescription: cols[3],
            basePrompt: cols[4]
        };
    }
}

let matchedCount = 0;

for (let i = 0; i < jsonData.length; i++) {
    const spell = jsonData[i];
    const name = normalize(spell.SpellName);
    
    // Default empty fields
    spell.VisualDescription = '';
    spell.BasePrompt = '';

    if (tsvSpells[name]) {
        spell.VisualDescription = tsvSpells[name].visualDescription;
        spell.BasePrompt = tsvSpells[name].basePrompt;
        matchedCount++;
    } else {
        // Try partial match if not exact
        const matchingKey = Object.keys(tsvSpells).find(k => k.includes(name) || name.includes(k));
        if (matchingKey) {
            spell.VisualDescription = tsvSpells[matchingKey].visualDescription;
            spell.BasePrompt = tsvSpells[matchingKey].basePrompt;
            matchedCount++;
        }
    }
}

fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf8');
console.log(`Matched and merged ${matchedCount} spells from TSV into JSON.`);
