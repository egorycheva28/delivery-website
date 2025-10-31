import * as z from 'zod';

export const editPasswordShema = z.object({
    oldPassword1: z.string().nonempty("Это поле обязательно")
    .min(8, {message: "Минимальная длина пароля 8 символов"})
    .max(20, 'Пароль должен содержать максимум 20 символов')
    .refine((password) => /[a-zA-Z]/.test(password), {
        message: 'Пароль должен содержать хотя бы одну букву'
    })
    .refine((password) => /\d/.test(password), {
        message: 'Пароль должен содержать хотя бы одну цифру'
    }),
    newPassword1: z.string().nonempty("Это поле обязательно")
    .min(8, {message: "Минимальная длина пароля 8 символов"})
    .max(20, 'Пароль должен содержать максимум 20 символов')
    .refine((password) => /[a-zA-Z]/.test(password), {
        message: 'Пароль должен содержать хотя бы одну букву'
    })
    .refine((password) => /\d/.test(password), {
        message: 'Пароль должен содержать хотя бы одну цифру'
    }),
    newPassword2: z.string().nonempty("Это поле обязательно")
    .min(8, {message: "Минимальная длина пароля 8 символов"})
    .max(20, 'Пароль должен содержать максимум 20 символов')
    .refine((password) => /[a-zA-Z]/.test(password), {
        message: 'Пароль должен содержать хотя бы одну букву'
    })
    .refine((password) => /\d/.test(password), {
        message: 'Пароль должен содержать хотя бы одну цифру'
    }),
}).refine(
    (data) => data.newPassword1 == data.newPassword2,{message: "Пароли не совпадают", path: ["newPassword2"],}
);

export type editPasswordShema = z.infer<typeof editPasswordShema>;