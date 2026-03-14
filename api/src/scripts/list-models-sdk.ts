import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function listModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return;

    try {
        const genAI = new GoogleGenerativeAI(key);
        // O SDK não tem um método direto de 'listModels' no genAI, mas podemos tentar instanciar os comuns
        const models = ['gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-2.0-flash', 'gemini-2.0-flash-lite-preview-02-05'];
        
        console.log("--- Testando Modelos ---");
        for (const m of models) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                await model.generateContent("hi");
                console.log(`✅ ${m}: DISPONÍVEL`);
            } catch (e: any) {
                console.log(`❌ ${m}: INDISPONÍVEL (${e.status || e.message})`);
            }
        }
    } catch (err: any) {
        console.error(err);
    }
}

listModels();
