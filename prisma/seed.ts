import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const users = [];

  for (let i = 1; i <= 20; i++) {
    users.push({
      name: `User${i}`,
      email: `user${i}@example.com`,
      password: await bcrypt.hash(`senha${i}`, 10),
    });
  }

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("20 usuários criados com sucesso!");
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
