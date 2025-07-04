import { FastifyInstance } from 'fastify';
import { createUser, authUser } from '../controllers/userController';


export async function userRoutes(app: FastifyInstance) {
    app.post('/users', createUser);
    app.post('/login', authUser);
}