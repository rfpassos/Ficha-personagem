import fs from 'fs';
import path from 'path';
import { convertToRealismPrompt } from '../services/realism.service';
import { generateImage } from '../services/image.service';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function generateSpellArts() {
    const spellsDataPath = path.resolve(__dirname, '../../../api/assets/data/magias-dnd-ptbr.json');
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

    const spells = JSON.parse(fs.readFileSync(spellsDataPath, 'utf8'));

    for (const spell of spells) {
        const name = spell.SpellName?.trim();
        const basePrompt = spell.BasePrompt?.trim();

        if (!name || !basePrompt) continue;

        // Verifica se a magia está na lista da Elara (ou contém o nome base)
        const isElaraSpell = elaraSpells.some((s: string) => name.toLowerCase().includes(s.toLowerCase()));
        if (!isElaraSpell) continue;

        console.log(`\n--- Processando: ${name} ---`);
        try {
            console.log(`Convertendo prompt para realismo...`);
            const realismPrompt = await convertToRealismPrompt(basePrompt);
            
            console.log(`Gerando imagem (4:5)...`);
            const result = await generateImage(realismPrompt, { aspect_ratio: 'portrait_4_5' });

            const cleanName = name.split('(')[0].trim().toLowerCase().replace(/\s+/g, '_');
            const fileName = `${cleanName}.png`;
            const filePath = path.join(outputDir, fileName);
            fs.writeFileSync(filePath, Buffer.from(result.base64, 'base64'));

            console.log(`✅ Arte salva em: ${filePath} (Source: ${result.source})`);
            
            await new Promise(r => setTimeout(r, 2000));
        } catch (err) {
            console.error(`❌ Erro ao processar ${name}:`, err);
        }
    }
}

generateSpellArts();
