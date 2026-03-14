import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function debugFreepik() {
    console.log('Testando Freepik Mystic...');
    const apiKey = process.env.FREEPIK_API_KEY;
    
    // Tenta com o mínimo de parâmetros
    const res = await fetch('https://api.freepik.com/v1/ai/mystic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-freepik-api-key': apiKey!,
        },
        body: JSON.stringify({
            prompt: 'A fantasy warrior in golden armor, realistic photography',
            aspect_ratio: 'portrait_2_3', // Como sugerido pela mensagem de erro
            model: 'mystic', // O modelo no Mystic costuma ser 'mystic' ou 'realism'
        }),
    });

    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Resposta:', JSON.stringify(data, null, 2));
}

debugFreepik();
