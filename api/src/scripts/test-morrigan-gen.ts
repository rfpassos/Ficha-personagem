import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { generateCharacterPrompt } from '../services/prompt.service';
import { generateCharacterImage } from '../services/image.service';

// Configuração de ambiente da raiz
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function main() {
    console.log('--- 🧪 Iniciando Teste de Geração Individual: Morrigan Aensland ---');

    console.log('Verificando chaves de ambiente...');
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error('❌ ERRO: GEMINI_API_KEY não encontrada no process.env!');
    } else {
        console.log(`✅ Chave encontrada: ${key.substring(0, 7)}...${key.substring(key.length - 4)}`);
    }

    const morriganData = {
        nome: "Morrigan Aensland",
        raca: "Tiefling (com Asas)",
        classe: "Bruxo (Arquifey)",
        nivel: 3,
        alinhamento: "Caótico e Neutro",
        aparencia: "Morrigan Aensland, a voluptuous succubus noble. Long vibrant green hair, matching eyes with mischief. fair skin, large dark bat wings on her back and a smaller pair on her head. Daring revealing black and purple leather outfit. High-fantasy setting.",
        personalidade: "Confiante, despreocupada e em busca de emoções fortes.",
        historia: "Herdeira do trono do Makai, viaja ao plano mortal em busca de estímulos.",
        atributos: {
            forca: 8,
            destreza: 14,
            constituicao: 14,
            inteligencia: 10,
            sabedoria: 10,
            carisma: 17
        }
    };

    try {
        // 1. Gerar o Prompt com o novo modelo e Meta-Prompt de Realismo
        console.log('\n[1/2] Gerando Prompt Otimizado (Gemini Flash + Realismo)...');
        const finalPrompt = await generateCharacterPrompt(morriganData as any);
        console.log('✅ Prompt Final Gerado:');
        console.log('--------------------------------------------------');
        console.log(finalPrompt);
        console.log('--------------------------------------------------');

        // 2. Gerar a Imagem na Cascata (Gemini -> Freepik)
        console.log('\n[2/2] Gerando Imagem...');
        const result = await generateCharacterImage(finalPrompt);
        
        const outputDir = path.join(__dirname, '../../../tmp');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
        
        const fileName = `test-morrigan-${Date.now()}.png`;
        const filePath = path.join(outputDir, fileName);
        
        fs.writeFileSync(filePath, Buffer.from(result.base64, 'base64'));
        
        console.log(`\n✨ Sucesso!`);
        console.log(`- Fonte da Imagem: ${result.source}`);
        console.log(`- Arquivo Salvo em: ${filePath}`);
        
    } catch (err) {
        console.error('\n❌ Falha no teste:', err);
    }
}

main();
