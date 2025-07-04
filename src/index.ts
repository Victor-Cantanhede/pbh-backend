import 'dotenv/config';
import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { userRoutes } from './routes/userRoutes';
// import { timeLogRoutes } from './routes/timeLogRoutes';

const PORT = process.env.PORT || 5000;

const app = Fastify({
    logger: true
});

app.register(fastifyCookie, { secret: process.env.JWT_SECRET as string || 'JWT_SECRET_DEV' });

app.register(userRoutes);
// app.register(timeLogRoutes);

app.listen({ port: PORT as number }, (error, address) => {
    if (error) {
        app.log.error(error);
        process.exit(1);
    }
    console.log(`Server running on: ${address}`);
});