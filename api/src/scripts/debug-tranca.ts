import 'dotenv/config';
import { generateImage } from '../services/image.service';
import { convertToRealismPrompt } from '../services/realism.service';
import fs from 'fs';
import path from 'path';

async function main() {
    const spellName = "Tranca Arcana";
    const basePrompt = `Cria a imagem de D&D para a Magia 'Tranca Arcana' que é do tipo 'Abjuração', do nível 2, com o efeito 'Fecha magicamente uma porta ou objeto, exigindo força ou magia para abrir.'. Será utilizada como imagem de fundo para ilustrar uma carta de magia. Sem textos. --ar 4:5`;

    console.log(`=== Testando Magia: ${spellName} ===`);
    
    try {
        console.log('1. Convertendo para prompt fotorrealista...');
        let realismPrompt = '';
        try {
            realismPrompt = await convertToRealismPrompt(basePrompt);
            console.log(`Prompt convertido:\n---\n${realismPrompt}\n---\n`);
        } catch (err: any) {
            console.error('ERRO na conversão de realismo:', err.message);
            console.log('Usando prompt base como fallback para a imagem...');
            realismPrompt = basePrompt;
        }

        console.log('2. Iniciando generateImage...');
        const result = await generateImage(realismPrompt, {
            aspect_ratio: 'portrait_4_5'
        });

        console.log(`Resultado Final -> Source: ${result.source}`);
        
        const fileName = `debug-${spellName.toLowerCase().replace(/ /g, '-')}-${Date.now()}.png`;
        const filePath = path.join(process.cwd(), fileName);
        
        // Se for placeholder, o tamanho será o do image-error.png (607996)
        const buffer = Buffer.from(result.base64, 'base64');
        fs.writeFileSync(filePath, buffer);
        console.log(`Arquivo salvo: ${fileName} (Tamanho: ${buffer.length} bytes)`);

        if (buffer.length === 607996) {
            console.warn('ALERTA: O arquivo salvo é o PLACEHOLDER DE ERRO.');
        }

    } catch (err: any) {
        console.error('ERRO FATAL NO TESTE:', err.message);
    }
}

main();
