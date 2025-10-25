import * as z from 'zod';

export const loginSchema = z.object({
    phone: z.string().min(1, 'Поле должно быть заполнено'),
    password: z.string().min(1, 'Поле должно быть заполнено')
});

export type LoginSchema = z.infer<typeof loginSchema>;