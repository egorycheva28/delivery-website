import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    loginSchema,
    type LoginSchema
} from "@/pages/Root/components/Header/components/LoginDialog/constants/LoginSchema.ts";
import {usePostLoginMutation} from "@/utils/api/hooks/usePostLoginMutation.ts";
import {useAuth} from "@/utils/contexts/auth";

export const useLoginDialog = (setIsOpen: (isOpen: boolean) => void, reload: () => void) => {
    const login = usePostLoginMutation()
    const { login: handleLogin } = useAuth()

    const loginForm = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
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
            reload()
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