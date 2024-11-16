import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

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

    const userCount = await prisma.user.count()
    if (userCount === 0) {
      await prisma.user.createMany({
        data: [
          { userName: 'RogerBV', password: bcrypt.hashSync('123456', 10) },
          { userName: 'GabyCC', password: bcrypt.hashSync('123456', 10) },
          { userName: 'RominaBC', password: bcrypt.hashSync('123456', 10) }
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