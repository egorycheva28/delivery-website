import {useState} from "react";
import {useGetCartQuery} from "@/utils/api/hooks/useGetCartQuery.ts";

export const useBasket = () => {
    /*const dishes = [
        {
            id: "string1",
            name: "Basket 1",
            price: 500,
            photos: [],
            dishNum: 5
        },
        {
            id: "string2",
            name: "Basket 2",
            price: 500,
            photos: [],
            dishNum: 2
        },
        {
            id: "string2",
            name: "Basket 3",
            price: 500,
            photos: [],
            dishNum: 1
        }
    ]*/

    const cart = useGetCartQuery()

    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteAll = () => {
        console.log("Delete All")
    }

    return {
        state: { cart, isOpen },
        functions: { handleDeleteAll, setIsOpen }
    }
}