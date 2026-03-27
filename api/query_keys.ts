import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- API Keys ---');
    const keys = await prisma.apiKey.findMany();

    keys.forEach((key) => {
        console.log(`ID: ${key.id}`);
        console.log(`Prefix: ${key.keyPrefix}`);
        console.log(`Name: ${key.name}`);
        console.log(`Active: ${key.isActive}`);
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
