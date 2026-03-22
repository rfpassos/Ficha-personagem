
import dotenv from 'dotenv';
import path from 'path';
import { googleImage } from './api/src/services/google-api.service';

dotenv.config({ path: path.join(__dirname, '.env') });

async function test() {
    try {
        console.log('Testando Google Image com novas configurações...');
        const b64 = await googleImage('gemini-3.1-flash-image-preview', 'A cute black dragon with red eyes, fantasy art style, --ar 1:1');
        console.log('SUCESSO! Recebeu base64 de tamanho:', b64.length);
    } catch (err: any) {
        console.error('ERRO NO TESTE:', err.message || err);
        if (err.response) {
            console.error('Resposta da API:', JSON.stringify(err.response, null, 2));
        }
    }
}

test();
