
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Carrega .env da raiz do projeto
dotenv.config({ path: path.join(__dirname, '../../.env') });

const prisma = new PrismaClient();

async function main() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Definida' : 'NÃO DEFINIDA');
  
  try {
    const keys = await prisma.apiKey.findMany({
      where: { isActive: true },
      take: 1
    });
    
    if (keys.length === 0) {
      console.log('Nenhuma chave de API ativa encontrada.');
      // Cria uma chave de teste se não existir
      console.log('Crie uma chave manualmente ou use o script de admin.');
    } else {
      console.log('Chave encontrada (Prefix):', keys[0].keyPrefix);
      console.log('ID:', keys[0].id);
      console.log('Use a API Key que corresponde a este prefixo.');
    }
  } catch (err) {
    console.error('Erro ao consultar banco:', err);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
