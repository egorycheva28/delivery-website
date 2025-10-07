import * as z from 'zod';
//валидации добавить
const editAboutSchema = z.object({
    name: z.string(),
    phoneOperator: z.string(),
    phoneManager: z.string(),
    email: z.string(),
    address: z.string(),
    information: z.string()
})

export type EditAboutSchema = z.infer<typeof editAboutSchema>;