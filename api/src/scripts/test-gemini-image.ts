import 'dotenv/config';
import { googleImage } from '../services/google-api.service';
import fs from 'fs';
import path from 'path';

/**
 * Script de diagnóstico para o modelo de imagem do Gemini.
 * Tenta usar o modelo especificado pelo usuário e fallback para imagen-3.
 */

async function main() {
    const models = [
        'gemini-3.1-flash-image-preview', // Nome solicitado pelo usuário
        'gemini-2.0-flash-exp',
        'imagen-3.0-generate-001',
        'imagen-3.0-fast-generate-001'
    ];

    const prompt = "A hyper-realistic portrait of a Tiefling female warrior, cinematic lighting, 8k.";

    for (const model of models) {
        console.log(`\n--- Testando Modelo: ${model} ---`);
        try {
            const base64 = await googleImage(model, prompt);
            const fileName = `test-gemini-${model.replace(/[:\/]/g, '-')}.png`;
            fs.writeFileSync(path.join(process.cwd(), fileName), Buffer.from(base64, 'base64'));
            console.log(`✅ Sucesso! Imagem salva em ${fileName}`);
            break; // Se um funcionar, paramos
        } catch (error: any) {
            console.error(`❌ Falha no modelo ${model}:`, error.message);
        }
    }
}

main();
