import type { FastifyReply, FastifyRequest } from "fastify";
import { createUserSchema, deleteUserSchema, getUserIDSchema, getUsersSchema, patchUserSchema, putUserSchema } from "validator/user.validator.js";
import { createUserService, deleteUserService, getUserIDService, getUsersService, patchUserService, putUserService } from "service/user.service.js";
import { ZodError } from "zod";

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Validar entrada
    const data = createUserSchema.parse(request.body);

    // Chamar service
    const user = await createUserService(data);

    return reply.status(201).send({message: "Usuario criado com sucesso", user});
  } catch (err: any) {
    if (err instanceof ZodError) {
      return reply.status(400).send({ error: err.issues[0]?.message });
    }

    if (err.message === "Email ja cadastrado") {
      return reply.status(409).send({ error: err.message });
    }

    return reply.status(500).send({ error: "Erro ao criar usuario" });
  }
}

export async function getUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {

    // Validar entrada    
    const data = getUsersSchema.parse(request.query);
    // Chamar service
    const users = await getUsersService(data);

    return reply.status(200).send(users);
  } catch (err: any) {
    if (err instanceof ZodError) {
      return reply.status(400).send({ error: err.issues[0]?.message });
    }

    console.error(err);
    return reply.status(500).send({ error: "Erro ao listar usuarios" });
  }
}

export async function getUserIDController(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    // Validar ID
    const data = getUserIDSchema.parse(request.params);

    // Chamar service
    const user = await getUserIDService(data);

    return reply.status(200).send(user);
  } catch (err: any) {
        if (err instanceof ZodError) {
        return reply.status(400).send({ error: err.issues[0]?.message });
        }

        if (err.message === "Usuario nao encontrado") {
        return reply.status(404).send({ error: err.message });
        }

        return reply.status(500).send({ error: "Erro ao procurar usuario" });
  }
}

export async function putUserController(request: FastifyRequest<{ Params: { id: string }; Body: { name?: string; email?: string } }>, reply: FastifyReply) {
    try {
        // Validar ID e body
        const params = putUserSchema.pick({ id: true }).parse(request.params);
        const body = putUserSchema.pick({ name: true, email: true }).parse(request.body);

        // Chamar service passando id + body
        const user = await putUserService({ id: params.id, ...body });

        return reply.status(200).send({message: "Usuario atualizado com sucesso", user});
    } catch (err: any) {
        if (err instanceof ZodError) {
        return reply.status(400).send({ error: err.issues[0]?.message });
        }

        if (err.message === "Usuario nao encontrado") {
        return reply.status(404).send({ error: err.message });
        }

        console.error(err);
        return reply.status(500).send({ error: "Erro ao atualizar usuario" });
    }
}

export async function deleteUserController(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply){
    try {
        // Validar ID
        const params = deleteUserSchema.pick({ id: true }).parse(request.params);

        const user = await deleteUserService({ id: params.id});

        return reply.status(200).send({message: "Usuario deletado com sucesso", user});
    } catch (err: any) {
        if (err instanceof ZodError) {
        return reply.status(400).send({ error: err.issues[0]?.message });
        }

        if (err.message === "Usuario nao encontrado") {
        return reply.status(404).send({ error: err.message });
        }

        console.error(err);
        return reply.status(500).send({ error: "Erro ao deletar usuario" });
    }
}

export async function patchUserController(request: FastifyRequest<{ Params: { id: string }; Body: { password?: string } }>,reply: FastifyReply) {
    try {
        // Validar ID
        const params = patchUserSchema.pick({ id: true }).parse(request.params);

        // Validar body
        const body = patchUserSchema.pick({ password: true }).parse(request.body);

        // Chamar service
        const user = await patchUserService({ id: params.id, password: body.password });

        return reply.status(200).send({
            message: "Senha atualizada com sucesso",
            user
    });
    } catch (err: any) {
    if (err instanceof ZodError) {
        return reply.status(400).send({ error: err.issues[0]?.message });
    }

    if (err.message === "Usuario nao encontrado") {
        return reply.status(404).send({ error: err.message });
    }

    console.error(err);
    return reply.status(500).send({ error: "Erro ao atualizar senha" });
    }
}