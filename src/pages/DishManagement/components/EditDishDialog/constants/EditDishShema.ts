import * as z from 'zod';

export const editDishSchema = z.object({
    name: z.string().nonempty("Это поле обязательно"),
    category: z.string().nonempty("Выберите категорию"),
    price: z.number().min(1, { message: "Это поле обязательно" }),
    description: z.string().nonempty("Это поле обязательно"),
    ingredients: z.string().nonempty("Это поле обязательно"),
    photo: z.string().nonempty("Это поле обязательно")
})

export type EditDishSchema = z.infer<typeof editDishSchema>;