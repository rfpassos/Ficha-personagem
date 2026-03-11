import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function listModels() {
    const key = process.env.GEMINI_API_KEY;
    console.log('Testando chave:', key?.substring(0, 10) + '...');
    
    if (!key) {
        console.error('ERRO: GEMINI_API_KEY não encontrada');
        return;
    }

    const genAI = new GoogleGenerativeAI(key);
    try {
        console.log('Listando modelos...');
        // O SDK do Node não tem um método direto listModels() no genAI objeto principal de forma amigável?
        // Sim, ele tem.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();
        console.log('Resposta da API:', JSON.stringify(data, null, 2));
    } catch (err: any) {
        console.error('ERRO:', err.message);
    }
}

listModels();
