import * as z from 'zod';

const newOperatorSchema = z.object({
    name: z.string(),
    phone: z.string(),
    password: z.string()
})

export type NewOperatorSchema = z.infer<typeof newOperatorSchema>;