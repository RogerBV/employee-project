import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const count = await prisma.department.count()
    if (count === 0) {
        await prisma.department.createMany({
            data: [
                { departmentName: 'IT' },
                { departmentName: 'Logistic' },
                { departmentName: 'Human Resources' },
            ]
        })
    }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });