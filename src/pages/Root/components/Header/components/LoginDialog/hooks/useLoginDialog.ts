import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    loginSchema,
    type LoginSchema
} from "@/pages/Root/components/Header/components/LoginDialog/constants/LoginSchema.ts";
import {usePostLoginMutation} from "@/utils/api/hooks/usePostLoginMutation.ts";
import {USER_TOKEN} from "@/utils/constants/token.ts";

export const useLoginDialog = (setIsOpen: (isOpen: boolean) => void) => {
    const login = usePostLoginMutation()

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

            localStorage.setItem(USER_TOKEN, token.data.accessToken)
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