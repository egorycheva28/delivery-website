import * as z from 'zod';

export const loginUserSchema = z.object({
    phone: z.string().min(1, 'Поле должно быть заполнено')
        .regex(/^(?:\+?7|8)\d{10}$/, "Введите корректный номер телефона"),
    password: z.string().min(1, 'Поле должно быть заполнено')
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;