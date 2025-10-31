import {useState} from "react";
import {useGetCartQuery} from "@/utils/api/hooks/useGetCartQuery.ts";
import {useDeleteAllDishIntoCartMutation} from "@/utils/api/hooks/useDeleteAllDishIntoCartMutation.ts";

export const useBasket = () => {
    const cart = useGetCartQuery({ basketId: localStorage.getItem('basketId')! })
    const deleteAllDishIntoCart = useDeleteAllDishIntoCartMutation()

    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteAll = async () => {
        await deleteAllDishIntoCart.mutateAsync({}, {
            onSuccess: () => {
                cart.refetch()
            }
        })
    }

    const handleSuccessBasketDesign = async () => {
        await cart.refetch()
        setIsOpen(true);
    }

    return {
        state: { cart, isOpen },
        functions: { handleDeleteAll, setIsOpen, handleSuccessBasketDesign }
    }
}