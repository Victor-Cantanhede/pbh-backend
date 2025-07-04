import 'dotenv/config';
import Fastify from 'fastify';
import { userRoutes } from './routes/userRoutes';
// import { timeLogRoutes } from './routes/timeLogRoutes';

const app = Fastify({
    logger: true
});

const PORT = process.env.PORT || 5000;

app.register(userRoutes);
// app.register(timeLogRoutes);

app.listen({ port: PORT as number }, (error, address) => {
    if (error) {
        app.log.error(error);
        process.exit(1);
    }
    console.log(`Server running on: ${address}`);
});