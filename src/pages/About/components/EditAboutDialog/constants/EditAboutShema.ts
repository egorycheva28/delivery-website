import * as z from 'zod';

export const editAboutSchema = z.object({
    name: z.string().min(2, "Минимум 2 символа").max(50, "Максимум 50 символов"),
    phoneOperator: z.string().regex(/^\+?\d{11}$/, "Введите корректный телефон оператора"),
    phoneManager: z.string().regex(/^\+?\d{11}$/, "Введите корректный телефон менеджера"),
    email: z.email("Введите корректный email"),
    address: z.string().min(2, "Минимум 2 символа").max(50, "Максимум 50 символов"),
    information: z.string()
})

export type EditAboutSchema = z.infer<typeof editAboutSchema>;