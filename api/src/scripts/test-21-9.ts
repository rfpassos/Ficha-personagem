import 'dotenv/config';
import { generateImage } from '../services/image.service';
import fs from 'fs';
import path from 'path';
import { convertToRealismPrompt } from '../services/realism.service';

async function main() {
    const basePrompt = "A high-fantasy portrait of Morrigan Aensland, a voluptuous succubus noble with long vibrant green hair and matching mischievous eyes. Cinematic lighting, 21:9 ultra-wide format.";
    
    console.log('=== Testando Geração 21:9 com Realismo (Gemini 3.1) ===');
    try {
        const prompt = await convertToRealismPrompt(basePrompt);
        console.log('[test] Prompt com realismo aplicado:', prompt);
        
        const result = await generateImage(prompt, { aspect_ratio: 'landscape_21_9' });
        const fileName = `test-morrigan-21-9-${Date.now()}.png`;
        fs.writeFileSync(path.join(process.cwd(), fileName), Buffer.from(result.base64, 'base64'));
        console.log(`✅ Sucesso! Fonte: ${result.source}`);
        console.log(`Imagem salva em ${fileName}`);
    } catch (error: any) {
        console.error('❌ Falha no teste:', error.message);
    }
}

main();
