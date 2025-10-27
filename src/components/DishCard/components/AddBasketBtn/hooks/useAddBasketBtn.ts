import {useState} from "react";
//import {usePostAddDishIntoCartMutation} from "@/utils/api/hooks/usePostAddDishIntoCart.ts";

export const useAddBasketBtn = (initialNum: number, idDish: string) => {
    ///const addDishIntoCart = usePostAddDishIntoCartMutation()

    const [dishNumber, setDishNumber] = useState(initialNum);

    const handleAddBasket = async () => {
        console.log("add " + idDish)
        setDishNumber(prev => prev + 1);
    }

    const handleRemoveBasket = () => {
        console.log("remove " + idDish)
        setDishNumber(prev => prev - 1);
    }

    return {
        state: { dishNumber },
        functions: { handleAddBasket, handleRemoveBasket }
    }
}