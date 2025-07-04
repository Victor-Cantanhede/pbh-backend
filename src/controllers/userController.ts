import { FastifyRequest, FastifyReply } from 'fastify';
import { createUserService } from '../services/userService';
import { CreateUserDTO } from '../schemas/userSchema';

export async function createUser(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as CreateUserDTO;
    const response = await createUserService(data);

    if (!response.success) {
        return res.status(400).send({ error: response.error });
    }

    return res.status(201).send(response.message);
}