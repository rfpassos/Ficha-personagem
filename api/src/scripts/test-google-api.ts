import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function testGemini() {
    const key = process.env.GEMINI_API_KEY;
    console.log('Chave encontrada (resumida):', key ? `${key.substring(0, 5)}...` : 'NÃO ENCONTRADA');
    
    if (!key) return;

    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent('Apresente-se em uma frase.');
        console.log('Resposta do Gemini:', result.response.text());
        console.log('✅ Chave Válida!');
    } catch (err: any) {
        console.error('❌ Erro na API do Google:', err.message);
        if (err.message.includes('API key not valid')) {
            console.error('DICA: A chave no .env parece estar com formato incorreto ou expirada.');
        }
    }
}

testGemini();
