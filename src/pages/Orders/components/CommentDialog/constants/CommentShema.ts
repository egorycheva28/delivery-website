import * as z from 'zod';

const commentSchema = z.object({
    comment: z.string().optional()
})

export type GetCommentSchema = z.infer<typeof commentSchema>;