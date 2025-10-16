import * as z from 'zod';

const reasonSchema = z.object({
    reason: z.string().optional()
})

export type GetReasonSchema = z.infer<typeof reasonSchema>;