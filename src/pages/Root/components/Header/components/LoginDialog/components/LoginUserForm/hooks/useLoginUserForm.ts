import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    loginUserSchema,
    type LoginUserSchema
} from "@/pages/Root/components/Header/components/LoginDialog/components/LoginUserForm/constants/LoginUserSchema.ts";
import {usePostLoginMutation} from "@/utils/api/hooks/usePostLoginMutation.ts";
import {useAuth} from "@/utils/contexts/auth";

export const useLoginUserForm = (setIsOpen: (isOpen: boolean) => void) => {
    const login = usePostLoginMutation()
    const { login: handleLogin } = useAuth()

    const loginForm = useForm<LoginUserSchema>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            phone: '',
            password: ''
        }
    });

    const onSubmit = loginForm.handleSubmit(async (value) => {
        try {
            const token = await login.mutateAsync({
                params: {
                    phone: value.phone,
                    password: value.password
                }
            });

            handleLogin(token.data.accessToken, token.data.refreshToken)
            loginForm.reset();
            setIsOpen(false);
        } catch (error) {
            loginForm.setError('root', {
                type: 'manual',
                message: 'Неверные данные'
            });
        }
    })

    return {
        form: loginForm,
        functions: { onSubmit }
    }
}