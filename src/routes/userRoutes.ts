import { FastifyInstance } from 'fastify';
import { createUser } from '../controllers/userController';

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', createUser);
}