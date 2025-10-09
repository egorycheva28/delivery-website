import * as z from 'zod';

export const newOperatorSchema = z.object({
    name: z.string().min(2, "Минимум 2 символа").max(50, "Максимум 50 символов"),
    phone: z.string().regex(/^\+?\d{11}$/, "Введите корректный номер телефона"),
    password: z.string().min(8, "Минимум 8 символов")
})

export type NewOperatorSchema = z.infer<typeof newOperatorSchema>;