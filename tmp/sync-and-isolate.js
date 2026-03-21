const fs = require('fs');
const path = require('path');

const TSV_PATH = path.join(__dirname, '../assets/templates/Lista e Descrições de Magias D&D - D&D.tsv');
const JSON_PATH = path.join(__dirname, '../api/assets/data/magias-dnd-ptbr.json');

const synonymMap = {
    "ACUDIR OS MORIBUNDOS": "ESTABILIZAR",
    "AMIGOS": "AMIZADE",
    "ARTE DRUIDICA": "DRUIDISMO",
    "RAIO MISTICO": "RAJADA MISTICA",
    "REPARAR": "CONSERTAR",
    "DANACAO (HEX)": "BRUXARIA",
    "EMARANHAR": "CONSTRICAO",
    "GRAXA": "AREA ESCORREGADIA",
    "IDENTIFICAR": "IDENTIFICACAO",
    "PASSOS LARGOS": "PASSOS LONGOS",
    "CORDA EXTRADIMENSIONAL": "TRUQUE DE CORDA",
    "ESCALADA DE ARANHA": "PATAS DE ARANHA",
    "PASSO SEM RASTRO": "PASSOS SEM PEGADAS",
    "PELE CASCA": "PELE DE ARVORE",
    "TURVAR (BLUR)": "NUBLAR",
    "VIGOR ARCANO": "VIDA FALSA",
    "VINCULO DE PROTECAO": "VINCULO PROTETOR",
    "CAMINHAR SOBRE AS AGUAS": "ANDAR NA AGUA",
    "CELERIDADE": "VELOCIDADE",
    "CRESCIMENTO DE PLANTAS": "AMPLIAR PLANTAS",
    "CRIAR COMIDA E AGUA": "CRIAR ALIMENTOS",
    "FALAR COM MORTOS": "FALAR COM OS MORTOS",
    "FLECHA RELAMPAGO": "FLECHA RELAMPEJANTE",
    "GLIFO DE PROTECAO": "GLIFO DE VIGILANCIA",
    "CONTROLAR AGUA": "CONTROLAR A AGUA",
    "PELE ROCHA": "PELE DE PEDRA",
    "CIRCULO DE TELEPORTE": "CIRCULO DE TELETRANSPORTE",
    "DE CARNE PARA PEDRA": "CARNE PARA PEDRA",
    "TELECINESE": "TELECINESIA",
    "PALAVRA DE REGRESSO": "PALAVRA DE RECORDACAO",
    "CARCERE DE ENERGIA": "PRISAO DE ENERGIA",
    "BOLHA ACIDA": "ESPIRRO ACIDO",
    "ZOMBARIA PERVERSA": "ZOMBARIA VICIOSE",
    "PALAVRA DE PODER: ATORDOAR": "PALAVRA DE PODER ATORDOAR",
    "PALAVRA DE PODER: MATAR": "PALAVRA DE PODER MATAR",
    "TRANSICAO PLANAR": "VIAGEM PLANAR"
};

function clean(n) {
    if (!n) return "";
    return n.trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\(.*\)/g, '').replace(/-/g, ' ').replace(/  +/g, ' ').trim();
}

function process() {
    const tsvContent = fs.readFileSync(TSV_PATH, 'utf-8');
    const lines = tsvContent.split('\n').slice(1).filter(l => l.trim() !== '');
    
    const json = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
    const jsonMap = new Map();
    json.forEach(s => jsonMap.set(clean(s.SpellName), s));

    const results = {
        updated: 0,
        added: 0,
        reallyMissing: []
    };

    const finalJson = [...json];

    for (const line of lines) {
        const cols = line.split('\t');
        const tsvName = cols[1]?.trim();
        if (!tsvName) continue;

        const cleanedTsv = clean(tsvName);
        
        // 1. Check if name already exists exactly (or via synonym)
        let existing = jsonMap.get(cleanedTsv) || (synonymMap[cleanedTsv] ? jsonMap.get(synonymMap[cleanedTsv]) : null);

        if (existing) {
            // Update name to TSV name and ensure visual data is there
            if (existing.SpellName !== tsvName) {
                existing.SpellName = tsvName;
                results.updated++;
            }
            existing.VisualDescription = cols[3]?.trim();
            existing.BasePrompt = cols[4]?.trim();
        } else {
            // Truly missing
            results.reallyMissing.push({
                SpellName: tsvName,
                Level: parseInt(cols[0]),
                School: cols[2]?.trim(),
                VisualDescription: cols[3]?.trim(),
                BasePrompt: cols[4]?.trim()
            });
        }
    }

    // Save current progress (Synonyms updated)
    fs.writeFileSync(JSON_PATH, JSON.stringify(finalJson, null, 2));
    
    // Save really missing for next step
    fs.writeFileSync('c:/Projetos/Ficha-personagem/tmp/truly_missing.json', JSON.stringify(results.reallyMissing, null, 2));

    console.log(`--- RELATÓRIO DE PROCESSAMENTO ---`);
    console.log(`Magias Renomeadas/Atualizadas: ${results.updated}`);
    console.log(`Magias TOTALMENTE FAFALTANTES: ${results.reallyMissing.length}`);
    console.log(`Lista salva em tmp/truly_missing.json`);
}

process();
