import type { FastifyReply, FastifyRequest } from "fastify";
import { createUserSchema, deleteUserSchema, getUserIDSchema, getUsersSchema, patchUserSchema, putUserSchema } from "validator/user.validator.js";
import { createUserService, deleteUserService, getUserIDService, getUsersService, patchUserService, putUserService } from "service/user.service.js";
import { ZodError } from "zod";

// Funçao de controller que recebe como parametros os formatos do fastify
export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Validar entrada baseado no createUserSchema usando o zod
    const data = createUserSchema.parse(request.body);

    // Chamar service createUserService que contem a logica de criacao do usuario no banco
    const user = await createUserService(data);

    // Se tudo der certo retorna 201 Created e a mensagem usuario criado com sucesso
    return reply.status(201).send({message: "Usuario criado com sucesso", user});
  } catch (err: any) {
    // Se o erro acontecer na validacao dos dados do Zod retorna 400 Bad Request
    if (err instanceof ZodError) {
      return reply.status(400).send({ error: err.issues[0]?.message });
    }
    // Se o erro for em um email ja cadastrado retorna 409 Conflict
    if (err.message === "Email ja cadastrado") {
      return reply.status(409).send({ error: err.message });
    }

    //Qualquer outro erro retorna 500 Internal Server Error
    return reply.status(500).send({ error: "Erro ao criar usuario" });
  }
}
// Funçao de controller que recebe como parametros os formatos do fastify
export async function getUserController(request: FastifyRequest, reply: FastifyReply){
  try {

    // Validar entrada usando Zod getUsersSchema 
    const data = getUsersSchema.parse(request.query);
    // // Chamar service getUsersService que contem a logica do banco de dados
    const users = await getUsersService(data);

    // Se tudo der certo retorna 200 Ok e os usuarios
    return reply.status(200).send(users);
  } catch (err: any) {
    if (err instanceof ZodError) {
      // Se o erro acontecer na validacao dos dados do Zod retorna 400 Bad Request
      return reply.status(400).send({ error: err.issues[0]?.message });
    }
    //Qualquer outro erro retorna 500 Internal Server Error

    console.error(err);
    return reply.status(500).send({ error: "Erro ao listar usuarios" });
  }
}

// Funçao de controller que recebe como parametros os formatos do fastify, nesse caso especificando que request.params tem { id: string }
export async function getUserIDController(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    // Validar ID
    const data = getUserIDSchema.parse(request.params);

    // Chamar service
    const user = await getUserIDService(data);
    
    // Se tudo der certo retorna 200 Ok e o usuario
    return reply.status(200).send(user);
  } catch (err: any) {
        if (err instanceof ZodError) {
        // Se o erro acontecer na validacao dos dados do Zod retorna 400 Bad Request
        return reply.status(400).send({ error: err.issues[0]?.message });
        }
        // Se o erro for em um usuario nao encontrado retorna 404 Not Found
        if (err.message === "Usuario nao encontrado") {
        return reply.status(404).send({ error: err.message });
        }

        //Qualquer outro erro retorna 500 Internal Server Error

        return reply.status(500).send({ error: "Erro ao procurar usuario" });
  }
}

// Funçao de controller que recebe como parametros os formatos do fastify, nesse caso especificando
// que request.params tem { id: string } e o body com nome e email opcionais
export async function putUserController(request: FastifyRequest<{ Params: { id: string }; Body: { name?: string; email?: string } }>, reply: FastifyReply) {
    try {
        // Validar ID e body
        const params = putUserSchema.pick({ id: true }).parse(request.params);
        const body = putUserSchema.pick({ name: true, email: true }).parse(request.body);

        // Chamar service passando id + body
        const user = await putUserService({ id: params.id, ...body });

        // Se tudo der certo retorna 200 Ok e o usuario    
        return reply.status(200).send({message: "Usuario atualizado com sucesso", user});
    } catch (err: any) {
        // Se o erro acontecer na validacao dos dados do Zod retorna 400 Bad Request
        if (err instanceof ZodError) {
        return reply.status(400).send({ error: err.issues[0]?.message });
        }

        // Se o erro for em um usuario nao encontrado retorna 404 Not Found
        if (err.message === "Usuario nao encontrado") {
        return reply.status(404).send({ error: err.message });
        }

        //Qualquer outro erro retorna 500 Internal Server Error
        console.error(err);
        return reply.status(500).send({ error: "Erro ao atualizar usuario" });
    }
}

// Funçao de controller que recebe como parametros os formatos do fastify, nesse caso especificando que request.params tem { id: string }
export async function deleteUserController(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply){
    try {
        // Validar ID
        const params = deleteUserSchema.pick({ id: true }).parse(request.params);
        // Chamar service passando id
        const user = await deleteUserService({ id: params.id});
        // Se tudo der certo retorna 200 Ok e mensagem de sucesso
        return reply.status(200).send({message: "Usuario deletado com sucesso", user});
    } catch (err: any) {
        // Se o erro acontecer na validacao dos dados do Zod retorna 400 Bad Request
        if (err instanceof ZodError) {
        return reply.status(400).send({ error: err.issues[0]?.message });
        }

        // Se o erro for em um usuario nao encontrado retorna 404 Not Found
        if (err.message === "Usuario nao encontrado") {
        return reply.status(404).send({ error: err.message });
        }

        //Qualquer outro erro retorna 500 Internal Server Error
        console.error(err);
        return reply.status(500).send({ error: "Erro ao deletar usuario" });
    }
}

// Funçao de controller que recebe como parametros os formatos do fastify, nesse caso especificando que request.params tem { id: string } 
// e o body com senha
export async function patchUserController(request: FastifyRequest<{ Params: { id: string }; Body: { password: string } }>,reply: FastifyReply) {
    try {
        // Validar ID
        const params = patchUserSchema.pick({ id: true }).parse(request.params);

        // Validar body
        const body = patchUserSchema.pick({ password: true }).parse(request.body);

        // Chamar service
        const user = await patchUserService({ id: params.id, password: body.password });

        // Se tudo der certo retorna 200 Ok e mensagem de sucesso e usuario atualizado
        return reply.status(200).send({
            message: "Senha atualizada com sucesso",
            user
    });
    } catch (err: any) {
    if (err instanceof ZodError) {
        // Se o erro acontecer na validacao dos dados do Zod retorna 400 Bad Request
        return reply.status(400).send({ error: err.issues[0]?.message });
    }

    if (err.message === "Usuario nao encontrado") {
        // Se o erro for em um usuario nao encontrado retorna 404 Not Found
        return reply.status(404).send({ error: err.message });
    }

    //Qualquer outro erro retorna 500 Internal Server Error
    console.error(err);
    return reply.status(500).send({ error: "Erro ao atualizar senha" });
    }
}