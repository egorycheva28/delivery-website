import * as z from 'zod';

const filterSchema = z.object({
    statuses: z.array(z.string()).default([]),
    operators: z.array(z.string()).default([])
})

export type GetFilterSchema = z.infer<typeof filterSchema>;