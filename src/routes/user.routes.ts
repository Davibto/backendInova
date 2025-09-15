import { type FastifyInstance } from "fastify";
import {
  deleteUserController,
  getUserController,
  getUserIDController,
  patchUserController,
  putUserController,
} from "../controller/user.controller.js";
import { authMiddleware } from "middleware/auth.middleware.js";

// Tipagens das rotas
interface UserParams {
  id: string;
}

interface UpdateUserBody {
  name?: string;
  email?: string;
}

interface PatchPasswordBody {
  password: string;
}

export async function userRoutes(app: FastifyInstance) {
  // O preHandler 'authMiddleware' garante que apenas usuários autenticados possam acessar

  // lista todos os usuarios 
  app.get("/users", { preHandler: [authMiddleware] }, getUserController);

  // pegar usuario por ID
  app.get<{ Params: UserParams }>(
    "/users/:id",
    { preHandler: [authMiddleware] },
    getUserIDController
  );

  // atualizar email ou nome do usuario
  app.put<{ Params: UserParams; Body: UpdateUserBody }>(
    "/users/:id",
    { preHandler: [authMiddleware] },
    putUserController
  );

  // deletar usuario por ID
  app.delete<{ Params: UserParams }>(
    "/users/:id",
    { preHandler: [authMiddleware] },
    deleteUserController
  );

  // atualizar senha por id
  app.patch<{ Params: UserParams; Body: PatchPasswordBody }>(
    "/users/:id/password",
    { preHandler: [authMiddleware] },
    patchUserController
  );
}
