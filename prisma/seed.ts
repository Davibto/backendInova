import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o processo de seeding...");

  // Opcional: Limpa a tabela de usuários para um estado inicial limpo
  await prisma.user.deleteMany();
  console.log("Usuários antigos removidos.");

  // Cria um array de promessas para a geração de hash das senhas
  const userPromises = Array.from({ length: 20 }, (_, i) => {
    const userIndex = i + 1;
    return bcrypt.hash(`senha${userIndex}`, 10).then(passwordHash => ({
      name: `User${userIndex}`,
      email: `user${userIndex}@example.com`,
      password: passwordHash,
    }));
  });

  // Executa todas as promessas em paralelo
  const users = await Promise.all(userPromises);

  // Insere todos os usuários de uma vez
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true, // Ignora se o usuário já existir
  });

  console.log("20 usuários criados com sucesso!");

  // 👉 Cria o usuário fixo "teste"
  const hashedPassword = await bcrypt.hash("123456", 10);
  await prisma.user.create({
    data: {
      name: "teste",
      email: "teste@example.com",
      password: hashedPassword,
    },
  });

  console.log("Usuário fixo 'teste' criado com sucesso!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
