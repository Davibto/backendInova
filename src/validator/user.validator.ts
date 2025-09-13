import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const getUsersSchema = z.object({
    page: z.string().optional(),    
    limit: z.string().optional(),
});

export const getUserIDSchema = z.object({
    id: z.uuid("ID invalido")
});

export const putUserSchema = z.object({
    id: z.uuid("ID invalido"),
    name: z.string().optional(),
    email: z.email("Email inválido").optional()
});

export const deleteUserSchema = z.object({
    id: z.uuid("ID invalido"),    
});

export const patchUserSchema = z.object({
    id: z.uuid("ID invalido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")    
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type GetUsersInput = z.infer<typeof getUsersSchema>;
export type GetUserIDInput = z.infer<typeof getUserIDSchema>;
export type PutUserInput = z.infer<typeof putUserSchema>;
export type DeleteUserInput = z.infer<typeof deleteUserSchema>;
export type PatchUserInput = z.infer<typeof patchUserSchema>;