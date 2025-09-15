import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

// Recebe de request e reply no formato do fastify
export async function authMiddleware(request: FastifyRequest,reply: FastifyReply) {
  try {
    // Le o header de authorization da requisicao
    const authHeader = request.headers["authorization"];

    // Se nao existir 401 Unauthorized
    if (!authHeader) {
      return reply.status(401).send({ message: "Token não informado" });
    }

    // Divide a string para pegar o token, se nao existir 401 Unauthorized
    const token = authHeader.split(" ")[1]; 
    if (!token) {
      return reply.status(401).send({ message: "Token inválido" });
    }

    //Verifica o token usando a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // Atribui decoded ao request.user para que outras rotas possam acessar o usuario logado
    (request as any).user = decoded; 
  } catch (error) {
    // Qualquer outro erro retorna 401 Unauthorized
    return reply.status(401).send({ message: "Token inválido ou expirado" });
  }
}