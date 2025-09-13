import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import type { CreateUserInput, DeleteUserInput, GetUserIDInput, GetUsersInput, PatchUserInput, PutUserInput } from "validator/user.validator.ts";

export async function createUserService(data: CreateUserInput) {
  const { name, email, password } = data;

  // Verificar se o email ja existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email ja cadastrado");
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar usuario
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Retornar usuario, id e senha
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getUsersService(data: GetUsersInput) {
    const page = parseInt(data.page || "1");
    const limit = parseInt(data.limit || "10");
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({ skip, take: limit, select: {id: true, name: true, email: true,}});
    return {users};
}

export async function getUserIDService(data: GetUserIDInput) {
    const { id } = data;

    // Buscar usuário pelo ID
    const existingUser = await prisma.user.findUnique({
        where: { id },
    });

    if (!existingUser) {
        throw new Error("Usuario nao encontrado");
    }

    const { name, email } = existingUser;
    return { name, email };
}

export async function putUserService(data: PutUserInput) {
    const {id, name, email } = data;

    const existingUser = await prisma.user.findUnique({
    where: { id },
    });

    if (!existingUser) {
        throw new Error("Usuario nao encontrado");
    }

    // Atualizar usuário
    const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name: name ?? existingUser.name, // se nao vier no body mantem
      email: email ?? existingUser.email
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  });

  return updatedUser;

}

export async function deleteUserService(data: DeleteUserInput) {
  const { id } = data;

  // Verificar se usuário existe
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error("Usuario nao encontrado");
  }

  // Deletar usuário
  const deletedUser = await prisma.user.delete({
    where: { id },
    select: { id: true, name: true, email: true} // não retorna senha
  });

  return deletedUser;
}

export async function patchUserService(data: PatchUserInput) {
  const { id, password } = data;

  // Verificar se usuario existe
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error("Usuario nao encontrado");
  }

  // Preparar dados para atualizar
  const updateData: { password?: string } = {};
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  // Atualizar usuário
  const patchedUser = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
    }
  });

  return patchedUser;
}