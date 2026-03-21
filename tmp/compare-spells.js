const fs = require('fs');
const path = require('path');

const TSV_PATH = path.join(__dirname, '../assets/templates/Lista e Descrições de Magias D&D - D&D.tsv');
const JSON_PATH = path.join(__dirname, '../api/assets/data/magias-dnd-ptbr.json');

function compare() {
    // Read TSV - UTF-8 should work fine based on view_file
    const tsvContent = fs.readFileSync(TSV_PATH, 'utf-8');
    const lines = tsvContent.split('\n').filter(line => line.trim() !== '');
    
    // Extrar nomes do TSV (Segunda coluna é "Magia")
    const tsvSpells = new Set();
    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split('\t');
        if (columns[1]) {
            tsvSpells.add(columns[1].trim().toUpperCase());
        }
    }

    // Read JSON
    const jsonContent = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
    const jsonSpells = new Set(jsonContent.map(s => s.SpellName.trim().toUpperCase()));

    const missingInJson = [];
    for (const spell of tsvSpells) {
        if (!jsonSpells.has(spell)) {
            missingInJson.push(spell);
        }
    }

    console.log('--- RELATÓRIO DE COMPARAÇÃO ---');
    console.log(`Magias únicas no TSV: ${tsvSpells.size}`);
    console.log(`Magias únicas no JSON: ${jsonSpells.size}`);
    console.log(`Diferença (TSV mas NÃO no JSON): ${missingInJson.length}`);
    
    if (missingInJson.length > 0) {
        console.log('\nMagias Faltantes no JSON:');
        missingInJson.forEach(s => console.log(`- ${s}`));
    } else {
        console.log('\nParabéns! Todas as magias do TSV estão presentes no JSON.');
    }
}

compare();
