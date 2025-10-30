import {useState} from "react";
import {useGetCartQuery} from "@/utils/api/hooks/useGetCartQuery.ts";

export const useBasket = () => {
    const cart = useGetCartQuery({ basketId: localStorage.getItem('basketId')! })

    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteAll = () => {
        console.log("Delete All")
    }

    return {
        state: { cart, isOpen },
        functions: { handleDeleteAll, setIsOpen }
    }
}