import * as z from 'zod';

export const newOperatorSchema = z.object({
    name: z.string().nonempty("Это поле обязательно"),
    category: z.string().nonempty("Выберите категорию"),
    price: z.number(),
    description: z.string().nonempty("Это поле обязательно"),
    ingredients: z.string().nonempty("Это поле обязательно"),
    photo: z.string().nonempty("Это поле обязательно")
})

export type NewOperatorSchema = z.infer<typeof newOperatorSchema>;