import * as z from 'zod';

export const basketSchema = z.object({
    deliveryAddress: z.string().min(1, 'Поле должно быть заполнено'),
    email: z.string().min(1, 'Поле должно быть заполнено').email('Некорректный email'),
    password: z.string().min(8, 'Минимум 8 символов').optional(),
    paymentMethod: z.string().min(1, 'Выберите способ оплаты')
});

export type BasketSchema = z.infer<typeof basketSchema>;