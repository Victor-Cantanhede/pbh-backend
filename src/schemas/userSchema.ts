import { z } from 'zod';

export const createUserSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'O nome deve ter no mínimo 3 caracteres!' })
        .max(80, { message: 'O nome deve ter no máximo 80 caracteres!' })
        .trim()
        .toUpperCase()
        .refine((val) => /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(val), { message: 'O nome deve conter apenas letras e espaços!' })
        .refine((val) => !/\s{3,}/.test(val), { message: 'O nome não pode conter mais de dois espaços consecutivos!' }),

    email: z.string().email({ message: 'E-mail inválido!' }).max(40),

    password: z
        .string()
        .min(8, { message: 'A senha deve ter no mínimo 8 caracteres!' })
        .max(20, { message: 'A senha deve ter no máximo 20 caracteres!' })
        .refine((val) => /[a-z]/.test(val), { message: 'A senha deve conter pelo menos uma letra minúscula!' })
        .refine((val) => /[A-Z]/.test(val), { message: 'A senha deve conter pelo menos uma letra maiúscula!' })
        .refine((val) => /[0-9]/.test(val), { message: 'A senha deve conter pelo menos um número!' })
        .refine((val) => /[^A-Za-z0-9]/.test(val), { message: 'A senha deve conter pelo menos um caractere especial!' })
        .refine((val) => !/\s/.test(val), { message: 'A senha não pode conter espaços!' }),

    workSchedule: z.enum(['SIX_ONE', 'FIVE_TWO'], { errorMap: () => ({ message: 'Escolha um tipo de jornada válido!' }) }),
    workStart: z.string().datetime({ message: 'Horário de entrada inválido!' }),
    lunchStart: z.string().datetime({ message: 'Início do almoço inválido!' }),
    lunchEnd: z.string().datetime({ message: 'Fim do almoço inválido!' }),
    workEnd: z.string().datetime({ message: 'Horário de saída inválido!' })
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;