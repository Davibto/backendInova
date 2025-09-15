import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { LoginInput } from "validator/auth.validator.js";

// Funcao de login que recebe os dados dos usuarios
export async function loginService(data: LoginInput) {
  // Extrai email e senha do input
  const { email, password } = data;

  // Busca o usuário no banco pelo email
  const user = await prisma.user.findUnique({ where: { email } });

  // Se não encontrar o usuário, lança um erro
  if (!user) throw new Error("Email ou senha inválidos");

  // Compara a senha fornecida com a senha criptografada no banco
  const isValid = await bcrypt.compare(password, user.password);

  // Se a senha estiver incorreta, lança um erro
  if (!isValid) throw new Error("Email ou senha inválidos");

  // Gera token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "24h" } 
  );

  return { token };
}