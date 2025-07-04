import { prisma } from '../lib/prisma';
import { createUserSchema, CreateUserDTO } from '../schemas/userSchema';
import bcrypt from 'bcryptjs';


/*************************** CREATE USER **************************/
export async function createUserService(data: CreateUserDTO) {
    try {
        const parsedData = createUserSchema.parse(data);

        const existingUser = await prisma.Users.findUnique({
            where: { email: parsedData.email }
        });

        if (existingUser) {
            return { success: false, error: 'Este e-mail já está sendo utilizado por outro usuário!' };
        }

        const hashedPassword = await bcrypt.hash(parsedData.password, 10);

        const user = await prisma.Users.create({
            ...parsedData,
            password: hashedPassword,
            workStart: new Date(parsedData.workStart),
            lunchStart: new Date(parsedData.lunchStart),
            lunchEnd: new Date(parsedData.lunchEnd),
            workEnd: new Date(parsedData.workEnd),
        });

        return { success: true, message: 'Usuário cadastrado com sucesso!', user };

    } catch (error: any) {
        return { success: false, error: error.message as Error };
    }
}