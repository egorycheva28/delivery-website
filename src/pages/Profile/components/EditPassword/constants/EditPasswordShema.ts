import * as z from 'zod';

export const editPasswordShema = z.object({
    oldPassword1: z.string().nonempty("Это поле обязательно").min(8, {message: "Минимальная длина пароля 8 символов"}).max(12, {message: "Максимальная длина пароля 12 символов"}),
    newPassword1: z.string().nonempty("Это поле обязательно").min(8, {message: "Минимальная длина пароля 8 символов"}).max(12, {message: "Максимальная длина пароля 12 символов"}),
    newPassword2: z.string().nonempty("Это поле обязательно").min(8, {message: "Минимальная длина пароля 8 символов"}).max(12, {message: "Максимальная длина пароля 12 символов"}),
})

export type editPasswordShema = z.infer<typeof editPasswordShema>;