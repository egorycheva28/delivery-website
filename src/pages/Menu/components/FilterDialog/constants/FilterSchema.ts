import * as z from 'zod';

const filterSchema = z.object({
    ingredients: z.array(z.string()).default([]),
    min_price: z.coerce.number().optional(),
    max_price: z.coerce.number().optional()
})

export type GetFilterSchema = z.infer<typeof filterSchema>;