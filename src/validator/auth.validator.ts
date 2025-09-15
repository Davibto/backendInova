import { z } from "zod";

// Define o schema de validação para o login
export const loginSchema = z.object({
  // Valida que o campo 'email' seja um email válido
  email: z.email(),
  // Valida que o campo 'password' seja uma string com pelo menos 6 caracteres
  password: z.string().min(6)
});

// Cria um tipo TypeScript inferido a partir do schema
// LoginInput terá a tipagem: { email: string; password: string; }
export type LoginInput = z.infer<typeof loginSchema>;