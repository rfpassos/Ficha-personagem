import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function verify() {
    const key = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(key!);
    
    // Modelos para testar
    const targets = ['gemini-2.0-flash', 'gemini-flash-latest'];
    
    for (const t of targets) {
        try {
            console.log(`Tentando ${t}...`);
            const model = genAI.getGenerativeModel({ model: t });
            const res = await model.generateContent("hi");
            console.log(`✅ ${t} FUNCIONOU: ${res.response.text().substring(0, 10)}...`);
        } catch (e: any) {
            console.log(`❌ ${t} FALHOU: ${e.message}`);
        }
    }
}
verify();
