import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function checkKey() {
    const key = process.env.GEMINI_API_KEY;
    console.log(`Testando chave: ${key?.substring(0, 7)}...`);
    
    if (!key) {
        console.error('Sem chave!');
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello!");
        console.log("✅ Resposta do Gemini:", result.response.text());
    } catch (err: any) {
        console.error("❌ Erro ao chamar o Gemini:");
        if (err.status) console.error(`Status: ${err.status}`);
        console.error(err.message || err);
    }
}

checkKey();
