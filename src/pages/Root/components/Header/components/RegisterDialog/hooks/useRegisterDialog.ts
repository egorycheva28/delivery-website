import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    registerSchema,
    type RegisterSchema
} from "@/pages/Root/components/Header/components/RegisterDialog/constants/RegisterSchema.ts";
import {usePostRegisterMutation} from "@/utils/api/hooks/usePostRegisterMutation.ts";
import {USER_TOKEN} from "@/utils/constants/token.ts";

export const useRegisterDialog = (setIsOpen: (isOpen: boolean) => void) => {
    const register = usePostRegisterMutation()

    const registerForm = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: '',
            phone: '',
            password: ''
        }
    });

    const onSubmit = registerForm.handleSubmit(async (value) => {
        try {
            const token = await register.mutateAsync({
                params: {
                    fullName: value.fullName,
                    phone: value.phone,
                    password: value.password
                }
            })

            localStorage.setItem(USER_TOKEN, token.data.accessToken)
            registerForm.reset()
            setIsOpen(false)
        } catch (error) {
            registerForm.setError('root', {
                type: 'manual',
                message: 'Неверные данные'
            });
        }
    })

    return {
        form: registerForm,
        functions: { onSubmit }
    }
}