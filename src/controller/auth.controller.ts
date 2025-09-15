import type { FastifyReply, FastifyRequest } from "fastify";
import { loginSchema, type LoginInput } from "../validator/auth.validator.js";
import { loginService } from "service/auth.service.js";

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Valida o body usando o Zod
    const validatedData: LoginInput = loginSchema.parse(request.body);

    // Chama o service que faz a lógica de login e retorna o token
    const { token } = await loginService(validatedData);

    // Retorna o token para o cliente
    return reply.send({ token });
  } catch (error: any) {
    // Se for erro de validação do Zod
    if (error?.name === "ZodError") {
      return reply.status(400).send({ message: error.errors });
    }

    // Erros do service (ex: credenciais inválidas)
    return reply.status(401).send({ message: error.message });
  }
}
