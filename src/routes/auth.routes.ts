import type { FastifyInstance } from "fastify";
import { loginController } from "../controller/auth.controller.js";
import { createUserController } from "../controller/user.controller.js";

// rotas que nao precisam de protecao
export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", loginController);   
  app.post("/users", createUserController);   
}