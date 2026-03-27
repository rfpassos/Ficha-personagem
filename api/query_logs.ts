import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Últimas 5 Gerações ---');
    const generations = await prisma.generation.findMany({
        take: 5,
        orderBy: {
            createdAt: 'desc',
        },
    });

    generations.forEach((gen) => {
        console.log(`ID: ${gen.id}`);
        console.log(`Personagem: ${gen.characterName}`);
        console.log(`Status: ${gen.status}`);
        console.log(`Erro: ${gen.errorMessage}`);
        console.log(`Criado em: ${gen.createdAt}`);
        console.log('---------------------------');
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
