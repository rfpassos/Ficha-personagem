const fs = require('fs');
const path = require('path');

const TSV_PATH = path.join(__dirname, '../assets/templates/Lista e Descrições de Magias D&D - D&D.tsv');
const JSON_PATH = path.join(__dirname, '../api/assets/data/magias-dnd-ptbr.json');

function clean(name) {
    if (!name) return "";
    return name.trim()
        .toUpperCase()
        .replace(/\(.*\)/g, '') // Remove (WISH), (HEAL), etc.
        .replace(/-/g, ' ')      // PELE-ROCHA -> PELE ROCHA
        .replace(/  +/g, ' ')    // Remove double spaces
        .trim();
}

function compare() {
    const tsvContent = fs.readFileSync(TSV_PATH, 'utf-8');
    const lines = tsvContent.split('\n').filter(line => line.trim() !== '');
    
    const tsvSpells = [];
    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split('\t');
        if (columns[1]) {
            tsvSpells.push({
                original: columns[1].trim(),
                cleaned: clean(columns[1])
            });
        }
    }

    const jsonContent = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
    const jsonSpells = jsonContent.map(s => ({
        original: s.SpellName,
        cleaned: clean(s.SpellName)
    }));

    const jsonCleanedSet = new Set(jsonSpells.map(s => s.cleaned));
    
    const reallyMissing = [];
    const likelySynonyms = [];

    for (const tsv of tsvSpells) {
        if (!jsonCleanedSet.has(tsv.cleaned)) {
            // Try very fuzzy (contains)
            const match = jsonSpells.find(j => j.cleaned.includes(tsv.cleaned) || tsv.cleaned.includes(j.cleaned));
            if (match) {
                likelySynonyms.push(`${tsv.original} -> ${match.original}`);
            } else {
                reallyMissing.push(tsv.original);
            }
        }
    }

    // De-duplicate lists
    const uniqueMissing = [...new Set(reallyMissing)];
    const uniqueSynonyms = [...new Set(likelySynonyms)];

    console.log('--- RELATÓRIO DE COMPARAÇÃO INTELIGENTE ---');
    console.log(`Diferenças brutas detectadas: ${uniqueMissing.length + uniqueSynonyms.length}`);
    console.log(`Prováveis Sinônimos (Nomes diferentes, mesma magia): ${uniqueSynonyms.length}`);
    console.log(`Realmente Faltantes no JSON: ${uniqueMissing.length}`);
    
    if (uniqueSynonyms.length > 0) {
        console.log('\nExemplos de Sinônimos:');
        uniqueSynonyms.slice(0, 10).forEach(s => console.log(`- ${s}`));
    }

    if (uniqueMissing.length > 0) {
        console.log('\nMagias REALMENTE Faltantes no JSON (Não encontradas nem por similaridade):');
        uniqueMissing.forEach(s => console.log(`- ${s}`));
    }
}

compare();
