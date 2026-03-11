import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function test() {
    const key = process.env.GEMINI_API_KEY;
    console.log('Testando chave:', key?.substring(0, 10) + '...');
    
    if (!key) {
        console.error('ERRO: GEMINI_API_KEY não encontrada no .env');
        return;
    }

    const genAI = new GoogleGenerativeAI(key);
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });
        const result = await model.generateContent('hi');
        console.log('SUCESSO:', result.response.text());
    } catch (err: any) {
        console.error('FALHA NA API:', err.message);
        if (err.response) {
            console.error('STATUS:', err.response.status);
            console.error('DATA:', JSON.stringify(err.response.data));
        }
    }
}

test();
