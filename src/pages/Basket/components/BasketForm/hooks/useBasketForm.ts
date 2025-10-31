import {useForm} from "react-hook-form";
import {basketSchema, type BasketSchema} from "@/pages/Basket/components/BasketForm/constants/BasketSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/utils/contexts/auth";
import {useGetUserByPhoneMutation} from "@/utils/api/hooks/useGetUserByPhoneMutation.ts";
import {usePostLoginMutation} from "@/utils/api/hooks/usePostLoginMutation.ts";
import {usePostRegisterMutation} from "@/utils/api/hooks/usePostRegisterMutation.ts";
import {usePostCreateOrderMutation} from "@/utils/api/hooks/usePostCreateOrderMutation.ts";

export const useBasketForm = (openSuccessBasketDesign: () => void) => {
    const {authenticated, login: handleLogin} = useAuth()

    const getUserByPhone = useGetUserByPhoneMutation()
    const login = usePostLoginMutation()
    const register = usePostRegisterMutation()
    const createOrder = usePostCreateOrderMutation()

    const basketSubmitForm = useForm<BasketSchema>({
        resolver: zodResolver(basketSchema),
        defaultValues: {
            address: '',
            phoneNumber: '',
            password: !authenticated ? '' : undefined,
            paymentMethod: '',
            comment: undefined
        }
    });

    const handleSelectPayment = (payment: string) => {
        basketSubmitForm.setValue('paymentMethod', payment, {
            shouldValidate: true
        });
    }

    const onSubmit = basketSubmitForm.handleSubmit(async (values) => {
        try {
            let userExists = false;

            try {
                await getUserByPhone.mutateAsync({
                    params: { phone: values.phoneNumber }
                });
                userExists = true;
            } catch (error: any) {
                if (error.response?.status !== 404) {
                    throw error;
                }
            }

            if (!authenticated && values.password) {
                let token: string;

                if (userExists) {
                    const loginResponse = await login.mutateAsync({
                        params: {
                            phone: values.phoneNumber,
                            password: values.password
                        }
                    });
                    token = loginResponse.data.accessToken;
                } else {
                    const registerResponse = await register.mutateAsync({
                        params: {
                            fullName: "Гость",
                            phone: values.phoneNumber,
                            password: values.password
                        }
                    });
                    token = registerResponse.data.accessToken;
                }

                handleLogin(token);
            }

            await createOrder.mutateAsync({
                params: {
                    phoneNumber: values.phoneNumber,
                    address: values.address,
                    paymentMethod: values.paymentMethod,
                    comment: values.comment
                }
            })
            basketSubmitForm.reset({
                address: '',
                phoneNumber: '',
                password: undefined,
                paymentMethod: '',
                comment: undefined
            });
            openSuccessBasketDesign();
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    });

    return {
        state: { isRegistered: authenticated },
        form: basketSubmitForm,
        functions: { onSubmit, handleSelectPayment }
    }
}