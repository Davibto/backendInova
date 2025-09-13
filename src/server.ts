import fastify from "fastify";
import { userRoutes } from "./routes/user.routes.js";
const app = fastify();

app.get('/',() => {
    return "Servidor Ok"
})

app.register(userRoutes)

app.listen({port: 8080}).then(()=>{
    console.log("Server is running!")
})