import fs from 'fs';
import path from 'path';
import { convertToRealismPrompt } from '../services/realism.service';
import { generateImage } from '../services/image.service';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function generateSpellArts() {
    const tsvPath = path.resolve(__dirname, '../../../assets/templates/Lista e Descrições de Magias D&D - D&D.tsv');
    const outputDir = path.resolve(__dirname, '../../../assets/spells/art');

    // Lista de magias da Elara para processar
    const elaraSpells = [
        "Metamorfose",
        "Alterar-se",
        "Tranca Arcana",
        "Levitação",
        "Velocidade",
        "Fabricar",
        "Teletransporte",
        "Desintegrar",
        "Transmutação de Pedra",
        "Prestidigitação",
        "Mãos Mágicas",
        "Remendar"
    ];

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const content = fs.readFileSync(tsvPath, 'utf8');
    const lines = content.split('\n');
    const headers = lines[0].split('\t');

    const promptBaseIdx = headers.findIndex(h => h.trim() === 'Prompt Base');
    const nameIdx = headers.findIndex(h => h.trim() === 'Magia');

    for (const line of lines.slice(1)) {
        const columns = line.split('\t');
        let name = columns[nameIdx]?.trim();
        const basePrompt = columns[promptBaseIdx]?.trim();

        if (!name || !basePrompt) continue;

        // Verifica se a magia está na lista da Elara (ou contém o nome base)
        const isElaraSpell = elaraSpells.some(s => name.toLowerCase().includes(s.toLowerCase()));
        if (!isElaraSpell) continue;

        console.log(`\n--- Processando: ${name} ---`);
        try {
            console.log(`Convertendo prompt para realismo...`);
            const realismPrompt = await convertToRealismPrompt(basePrompt);
            
            console.log(`Gerando imagem (4:5)...`);
            const result = await generateImage(realismPrompt, { aspect_ratio: 'portrait_4_5' });

            // Sanitização do nome do arquivo (ex: "Metamorfose" -> "metamorfose.png")
            // Remove parênteses e caracteres especiais para bater com o generate_elara_pdf.js
            const cleanName = name.split('(')[0].trim().toLowerCase().replace(/\s+/g, '_');
            const fileName = `${cleanName}.png`;
            const filePath = path.join(outputDir, fileName);
            fs.writeFileSync(filePath, Buffer.from(result.base64, 'base64'));

            console.log(`✅ Arte salva em: ${filePath} (Source: ${result.source})`);
            
            // Pequeno delay para respeitar o rate limit do tier preview
            await new Promise(r => setTimeout(r, 2000));
        } catch (err) {
            console.error(`❌ Erro ao processar ${name}:`, err);
        }
    }
}

generateSpellArts();
