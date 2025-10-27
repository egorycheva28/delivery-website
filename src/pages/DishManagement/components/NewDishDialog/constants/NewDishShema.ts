import * as z from 'zod';

export const newDishSchema = z.object({
    name: z.string().nonempty("Это поле обязательно"),
    categoryId: z.string().nonempty("Выберите категорию"),
    photo: z.string().optional(),
    rate: z.number(),
    price: z.number(),
    description: z.string().nonempty("Это поле обязательно"),
    ingredients: z.array(z.string()).nonempty("Это поле обязательно")
})

export type NewDishSchema = z.infer<typeof newDishSchema>;