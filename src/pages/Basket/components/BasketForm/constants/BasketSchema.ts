import * as z from 'zod';

export const basketSchema = z.object({
    address: z.string().min(1, 'Поле должно быть заполнено'),
    phoneNumber: z.string()
        .min(11, "Некоректный номер телефона")
        .max(11, "Некоректный номер телефона")
        .regex(/^8\d{10}$/, "Номер должен начинаться с 8 и содержать 11 цифр"),
    password: z.string().min(8, 'Минимум 8 символов').optional(),
    paymentMethod: z.string().min(1, 'Выберите способ оплаты'),
    comment: z.string().optional()
});

export type BasketSchema = z.infer<typeof basketSchema>;