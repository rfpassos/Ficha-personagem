
import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Carrega .env da raiz do projeto
dotenv.config({ path: path.join(__dirname, '../../.env') });

const prisma = new PrismaClient();

async function createTestKey() {
  const apiKey = 'maestro_test_key_1234567890'; // 12 chars prefixo + resto
  const prefix = apiKey.substring(0, 12);
  const keyHash = createHash('sha256').update(apiKey).digest('hex');

  console.log('Criando chave de teste...');
  console.log('Prefix:', prefix);
  console.log('Hash:', keyHash);

  try {
    const record = await prisma.apiKey.upsert({
      where: { keyPrefix: prefix },
      update: { isActive: true, keyHash: keyHash },
      create: {
        keyPrefix: prefix,
        keyHash: keyHash,
        name: 'Chave de Teste Local',
        isActive: true
      }
    });
    console.log('Chave de teste criada/atualizada com sucesso:', record.id);
    console.log('API_KEY para usar:', apiKey);
  } catch (err) {
    console.error('Erro ao criar chave:', err);
  }
}

createTestKey()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
