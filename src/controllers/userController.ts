import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserDTO, AuthUserDTO } from '../schemas/userSchema';
import { createUserService, authUserService } from '../services/userService';


/*************************** CREATE USER **************************/
export async function createUser(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as CreateUserDTO;
    const response = await createUserService(data);

    if (!response.success) {
        return res.status(400).send({ error: response.error });
    }

    return res.status(201).send(response.message);
}

/*************************** AUTH USER **************************/
export async function authUser(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as AuthUserDTO;
    const response = await authUserService(data);

    if (!response.success) {
        return res.status(400).send({ error: response.error });
    }

    const token = response.token as string;

    res.setCookie('token', token, {
        path: '/',
        httpOnly: true,
        secure: false, // Insira false para testar em desenvolvimento/teste
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 1 dia
    });

    return res.status(200).send({ success: true, message: response.message, token /* Retorne o token apenas para testar em desenvolvimento */ });
}