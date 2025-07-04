import { prisma } from '../lib/prisma';
import { createUserSchema, CreateUserDTO, authUserSchema, AuthUserDTO } from '../schemas/userSchema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


/*************************** CREATE USER **************************/
export async function createUserService(data: CreateUserDTO) {
    try {
        const parsedData = createUserSchema.parse(data);

        const existingUser = await prisma.user.findUnique({
            where: { email: parsedData.email }
        });

        if (existingUser) {
            return { success: false, error: 'Este e-mail já está sendo utilizado por outro usuário!' };
        }

        const hashedPassword = await bcrypt.hash(parsedData.password, 10);

        const user = await prisma.user.create({
            data: {
                ...parsedData,
                password: hashedPassword,
                workStart: new Date(parsedData.workStart),
                lunchStart: new Date(parsedData.lunchStart),
                lunchEnd: new Date(parsedData.lunchEnd),
                workEnd: new Date(parsedData.workEnd),
            }
        });

        return { success: true, message: 'Usuário cadastrado com sucesso!', user };

    } catch (error: any) {
        return { success: false, error: error.message as Error };
    }
}

/*************************** AUTH USER **************************/
export async function authUserService(data: AuthUserDTO) {
    try {
        const parsedData = authUserSchema.parse(data);

        const user = await prisma.user.findUnique({
            where: { email: parsedData.email }
        });

        if (!user) {
            return { success: false, error: 'Usuário não localizado!' };
        }

        const passwordMatch = await bcrypt.compare(parsedData.password, user.password);

        if (!passwordMatch) {
            return { success: false, error: 'Senha inválida!' };
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' } // 1 dia
        );

        return { success: true, message: 'Login efetuado com sucesso!', token };

    } catch (error: any) {
        return { success: false, error: error.message as Error };
    }
}