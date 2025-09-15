import fastify from "fastify";
import { userRoutes } from "./routes/user.routes.js";
import { authRoutes } from "./routes/auth.routes.js"; 

const app = fastify();

app.get("/", () => "Servidor Ok");

// Rotas
app.register(authRoutes);
app.register(userRoutes);

app.listen({ port: 8080 }).then(() => {
  console.log("Server is running on http://localhost:8080");
});
