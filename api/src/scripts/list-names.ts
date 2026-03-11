import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function listAllModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return;
    
    try {
        console.log('--- Testando GET (List Models) ---');
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json() as any;
        const names = (data.models || []).map((m: any) => m.name);
        console.log('Modelos listados:', names.length);
        
        console.log('\n--- Testando POST (API v1) ---');
        const genUrlV1 = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`;
        const genResV1 = await fetch(genUrlV1, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: 'hi' }] }]
            })
        });
        const genDataV1 = await genResV1.json() as any;
        console.log('Resposta Geração (v1):', JSON.stringify(genDataV1, null, 2));
    } catch (err: any) {
        console.error('ERRO:', err.message);
    }
}

listAllModels();
