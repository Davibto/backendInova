import { z } from "zod";

// Schema para criar usuário
export const createUserSchema = z.object({
    name: z.string(),
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

// Schema para listagem de usuários usando paginação

export const getUsersSchema = z.object({
    page: z.string().optional(),  // Pagina e limite sao opcionais
    limit: z.string().optional(),
});

// Schema para buscar usuário por ID
export const getUserIDSchema = z.object({
    id: z.uuid("ID invalido") // ID obrigatório e deve ser UUID
});

// Schema para atualizar usuário
export const putUserSchema = z.object({
    id: z.uuid("ID invalido"), // ID obrigatório e deve ser UUID
    name: z.string().optional(),
    email: z.email("Email inválido").optional()
});

// Schema para deletar usuário
export const deleteUserSchema = z.object({
    id: z.uuid("ID invalido"), // ID obrigatório e deve ser UUID
});

// Schema para atualizar senha do usuário
export const patchUserSchema = z.object({
    id: z.uuid("ID invalido"), // ID obrigatório e deve ser UUID
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")    
});

// Tipagens TypeScript inferidas automaticamente a partir dos schemas
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type GetUsersInput = z.infer<typeof getUsersSchema>;
export type PutUserInput = z.infer<typeof putUserSchema>;
export type GetUserIDInput = z.infer<typeof getUserIDSchema>;
export type DeleteUserInput = z.infer<typeof deleteUserSchema>;
export type PatchUserInput = z.infer<typeof patchUserSchema>;