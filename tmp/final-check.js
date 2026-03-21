const fs = require('fs');

const tsvPath = 'c:/Projetos/Ficha-personagem/assets/templates/Lista e Descrições de Magias D&D - D&D.tsv';
const jsonPath = 'c:/Projetos/Ficha-personagem/api/assets/data/magias-dnd-ptbr.json';

const tsvContent = fs.readFileSync(tsvPath, 'utf8').replace(/\uFEFF/g, ''); // Remove BOM if present
const rows = tsvContent.split(/\r?\n/).filter(r => r.trim());
console.log('Total Rows in TSV:', rows.length);
const tsvSpells = rows.slice(1).map(row => {
    const cols = row.split('\t');
    return cols[1] ? cols[1].trim().toUpperCase() : null;
}).filter(name => name !== null);

const jsonSpells = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const jsonSpellNames = jsonSpells.map(s => s.SpellName.trim().toUpperCase());

// Synonyms mapping (from previous steps)
const synonyms = {
    "ACUDIR OS MORIBUNDOS": "ESTABILIZAR",
    "ADESTRAR ANIMAL": "AMIZADE COM ANIMAIS",
    "AMIZADE": "AMIZADE ANIMAL", // Warning: Check if this was correct or if they are separate
    "APRIMORAR ATRIBUTO": "APRIMORAR ATRIBUTO", // Already matched
    "ARMA ESPIRITUAL": "ARMA ESPIRITUAL",
    "ATAQUE CERTEIRO": "GOLPE CERTEIRO",
    "AUXÍLIO": "AUXÍLIO",
    "BÊNÇÃO": "BÊNÇÃO",
    "BRUXA": "BRUXA", // ?
    "CALAFRIO TOCANTE": "TOQUE GÉLIDO",
    "CHAMA SAGRADA": "CHAMA SAGRADA",
    "CHICOTE DE ESPINHOS": "CHICOTE DE ESPINHOS",
    "COMANDO": "COMANDO",
    "COMPREENDER IDIOMAS": "COMPREENDER IDIOMAS",
    "CONSERTO": "CONSERTO",
    "CONTATAR OUTROS PLANOS": "CONTATAR OUTRO PLANO",
    "CONTRAMAGIA": "CONTRAMAGIA",
    "CONVOCAR ANIMAIS": "INVOCAR ANIMAIS",
    "CONVOCAR CELESTIAL": "INVOCAR CELESTIAL",
    "CONVOCAR ELEMENTAL": "INVOCAR ELEMENTAL",
    "CONVOCAR FEÉRICO": "INVOCAR FEÉRICO",
    "CUMPLICIDADE": "AMIZADE",
    "CURAR FERIMENTOS": "CURAR FERIMENTOS",
    "DESCARGA ELÉTRICA": "CHICOTE DE RAIOS",
    "DESCARGA MÍSTICA": "EXPLOSÃO MÍSTICA",
    "DETECÇÃO DE MAGIA": "DETECTAR MAGIA",
    "DETECTAR O BEM E O MAL": "DETECTAR O BEM E MAL",
    "DISFARÇAR-SE": "DISFARÇAR-SE",
    "DISSIPAR MAGIA": "DISSIPAR MAGIA",
    "DISSIPAR O BEM E O MAL": "DISSIPAR O BEM E MAL",
    "DOENÇA CONTAGIOSA": "CONTÁGIO",
    "ESCUDO": "ESCUDO",
    "ESCUDO DA FÉ": "ESCUDO DA FÉ",
    "ESPERANÇA": "SINAL DE ESPERANÇA",
    "ESPÍRITOS GUARDIÕES": "GUARDIÕES ESPIRITUAIS",
    "ESTABILIZAR": "ESTABILIZAR",
    "ESTÁTICA SINÁPTICA": "ESTÁTICA SINÁPTICA",
    "EXUBERÂNCIA": "ALEGRIA ATROZ DE TASHA",
    "FACA DE GELO": "FACA DE GELO",
    "FOGO DAS FADAS": "FOGO FADADO",
    "FORÇA ESPECTRAL": "FORÇA ESPECTRAL",
    "GOLPE FLAMEJANTE": "COLUNA DE CHAMAS",
    "IDENTIFICAÇÃO": "IDENTIFICAR",
    "IMAGEM SILENCIOSA": "IMAGEM SILENCIOSA",
    "IMAGEM SUBSTANCIAL": "IMAGEM MAIOR",
    "IMOBILIZAR PESSOA": "PARALISAR PESSOA",
    "INDUZIR O MEDO": "CAUSAR MEDO",
    "INFECTAR": "INFESTAÇÃO",
    "INVISIBILIDADE": "INVISIBILIDADE",
    "INVOCAR ANIMAIS": "INVOCAR ANIMAIS",
    "INVOCAR ELEMENTAIS MENORES": "INVOCAR ELEMENTAIS MENORES",
    "LAMPEJO": "LUZES DANÇANTES",
    "LAVAGEM CEREBRAL": "MODIFICAR MEMÓRIA",
    "LUZ": "LUZ",
    "MÃOS FLAMEJANTES": "MÃOS ESCALDANTES",
    "MENSAGEM": "MENSAGEM",
    "MÍSSEIS MÁGICOS": "MÍSSEIS MÁGICOS",
    "MONTARIA FANTASMA": "MONTARIA FANTASMÁGURICA",
    "MOVER TERRA": "MOLDAR TERRA",
    "NÉVOA OSCURECENTE": "NÉVOA OBSCURECENTE",
    "NUVEM DE ADAGAS": "NUVEM DE ADAGAS",
    "ONDAS DE CHOQUE": "ONDA DE TROVÃO",
    "ORAÇÃO DE CURA": "ORAÇÃO DE CURA",
    "ORBE CROMÁTICA": "ORBE CROMÁTICO",
    "PALAVRA CURATIVA": "PALAVRA CURATIVA",
    "PARALISAR PESSOA": "PARALISAR PESSOA",
    "PASSAR SEM DEIXAR RASTRO": "PASSOS SEM PEGADAS",
    "PASSO ANGELICAL": "PASSO MISTY",
    "PASSO DISTANTE": "PASSO DISTANTE",
    "PASSO MISTY": "PASSO NEVOENTO",
    "PATAS DE ARANHA": "PATAS DE ARANHA",
    "PEQUENO REFÚGIO DE LEOMUND": "CABANA DE LEOMUND",
    "POLIMORFIA": "POLIMORFIA",
    "PORTA DIMENSIONAL": "PORTA DIMENSIONAL",
    "PROXIMIDADE": "ALARM",
    "QUEDA SUAVE": "QUEDA SUAVE",
    "RAIO DE FOGO": "RAIO DE FOGO",
    "RAIO DE GELO": "RAIO DE GELO",
    "RAIO DE SOL": "RAIO SOLAR",
    "REMOVER MALDIÇÃO": "REMOVER MALDIÇÃO",
    "RESISTÊNCIA": "RESISTÊNCIA",
    "RESTAURAÇÃO": "RESTAURAÇÃO",
    "RETIRADA ACELERADA": "RECUO ACELERADO",
    "RETRIBUIÇÃO INFERNAL": "REPREENSÃO DIABÓLICA",
    "RISO HISTÉRICO DE TASHA": "RISO ATROZ DE TASHA",
    "SANTUÁRIO": "SANTUÁRIO",
    "SENTIDO FERAL": "SENTIDO BESTIAL",
    "SERVOS INVISÍVEIS": "SERVO INVISÍVEL",
    "SILÊNCIO": "SILÊNCIO",
    "SOPRO DE DRAGÃO": "SOPRO DE DRAGÃO",
    "SUGESTÃO": "SUGESTÃO",
    "SUGESTÃO EM MASSA": "SUGESTÃO EM MASSA",
    "TECELAGEM": "TECER MAGIA", // ?
    "TELEPORTE": "TELEPORTE",
    "TRAPACEIRO": "MÃOS MÁGICAS",
    "TURVAR": "TURVAR",
    "VELOCIDADE": "VELOCIDADE",
    "VER O INVISÍVEL": "VER O INVISÍVEL"
};

const missingInJson = [];
tsvSpells.forEach(name => {
    const synonym = synonyms[name] || name;
    if (!jsonSpellNames.includes(name) && !jsonSpellNames.includes(synonym)) {
        missingInJson.push(name);
    }
});

console.log('Total TSV Spells:', tsvSpells.length);
console.log('Total JSON Spells:', jsonSpells.length);
console.log('Missing Spells in JSON:', missingInJson.length);
if (missingInJson.length > 0) {
    console.log('Missing Names:', missingInJson);
}
