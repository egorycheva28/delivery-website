import * as z from 'zod';

export const rateDialogSchema = z.object({
    rating: z.number()
        .min(0, 'Оценка не может быть меньше 0')
        .max(5, 'Оценка не может быть больше 5')
});

export type RateDialogSchema = z.infer<typeof rateDialogSchema>;