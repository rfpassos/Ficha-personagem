import { generateCharacterPrompt } from './api/src/services/prompt.service';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

async function testFlow() {
    console.log('--- Iniciando Teste de Prompt com Realismo ---');
    const mockCharacter = {
        nome: "Teste Validação",
        raca: "Elfo",
        classe: "Mago",
        nivel: 1,
        atributos: { forca: 10, destreza: 10, constituicao: 10, inteligencia: 18, sabedoria: 12, carisma: 10 },
        aparencia: "Túnica azul, cajado de cristal, olhar sereno."
    };

    try {
        const finalPrompt = await generateCharacterPrompt(mockCharacter as any);
        console.log('\n✅ Prompt Gerado com Realismo:\n');
        console.log(finalPrompt);
    } catch (err) {
        console.error('❌ Erro no teste:', err);
    }
}

testFlow();
