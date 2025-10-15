import {useForm} from "react-hook-form";
import {basketSchema, type BasketSchema} from "@/pages/Basket/components/BasketForm/constants/BasketSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";

export const useBasketForm = (openSuccessBasketDesign: () => void) => {
    const isRegistered = false;

    const basketSubmitForm = useForm<BasketSchema>({
        resolver: zodResolver(basketSchema),
        defaultValues: {
            deliveryAddress: '',
            email: '',
            password: isRegistered ? '' : undefined,
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
        console.log(values)
        openSuccessBasketDesign();
    });

    return {
        state: { isRegistered },
        form: basketSubmitForm,
        functions: { onSubmit, handleSelectPayment }
    }
}