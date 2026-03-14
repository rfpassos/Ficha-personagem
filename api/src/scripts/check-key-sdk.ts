import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function checkKey() {
    const key = process.env.GEMINI_API_KEY;
    console.log(`Testando chave carregada: ${key?.substring(0, 7)}...${key?.substring(key.length - 4)}`);
    
    if (!key) {
        console.error('❌ ERRO: GEMINI_API_KEY não encontrada no process.env!');
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(key);
        // Usando o modelo solicitado pelo usuário para teste
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent("Respond with 'READY'");
        console.log("✅ Resposta do Gemini:", result.response.text());
    } catch (err: any) {
        console.error("❌ Erro ao chamar o Gemini via SDK:");
        console.error(err.message || err);
    }
}

checkKey();
