import { type FastifyInstance } from "fastify";
import { createUserController, deleteUserController, getUserController, getUserIDController, patchUserController, putUserController } from "../controller/user.controller.js";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", createUserController);

  app.get("/users", getUserController);

  app.get("/users/:id", getUserIDController);

  app.put("/users/:id", putUserController);

  app.delete("/users/:id", deleteUserController);

  app.patch("/users/:id/password", patchUserController);
}

