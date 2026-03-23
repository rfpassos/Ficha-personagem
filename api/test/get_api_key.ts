
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const keys = await prisma.apiKey.findMany({
    where: { isActive: true },
    take: 1
  });
  console.log(JSON.stringify(keys, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
