import 'dotenv/config';
import { generateImage, FreepikModel } from '../services/image.service';
import fs from 'fs';
import path from 'path';

/**
 * Script para testar individualmente os modelos do Freepik.
 * Uso: tsx api/src/scripts/test-freepik-models.ts <modelo>
 * Modelos: mystic, flux-2-klein, seedream-v4-5, z-image
 */

async function main() {
    const model = (process.argv[2] as FreepikModel) || 'mystic';
    const validModels: FreepikModel[] = ['mystic', 'flux-2-klein', 'seedream-v4-5', 'z-image'];

    if (!validModels.includes(model)) {
        console.error(`Modelo inválido. Use um de: ${validModels.join(', ')}`);
        process.exit(1);
    }

    // Prompt baseado na Morrigan Aensland para o teste
    const prompt = `Morrigan Aensland, female Tiefling Warlock, chaotic neutral noble. 
    She has prominent horns, large bat-like wings, and long flowing hair. 
    Wearing elegant noble robes in dark purple and black. 
    Seductive but powerful gaze, standing in a gothic castle balcony at midnight. 
    Hyper-realistic digital illustration, cinematic lighting, 8k resolution, Masterpiece.`;

    console.log(`\n=== Testando Modelo Freepik (DIRETO): ${model} ===`);
    console.log(`Prompt: ${prompt.substring(0, 100)}...`);

    try {
        // Chamando diretamente para evitar o fallback do Gemini no teste
        const { FreepikModel, generateWithFreepikInternal } = require('../services/image.service');
        const base64 = await (generateWithFreepikInternal as any)(prompt, 'portrait_2_3', model);

        console.log(`Resultado: Sucesso!`);

        if (base64) {
            const fileName = `test-gen-${model}-${Date.now()}.png`;
            const filePath = path.join(process.cwd(), fileName);
            fs.writeFileSync(filePath, Buffer.from(base64, 'base64'));
            console.log(`Imagem salva em: ${filePath}`);
        }
    } catch (error: any) {
        console.error(`Erro ao gerar imagem com ${model}:`, error.message);
    }
}

main();
