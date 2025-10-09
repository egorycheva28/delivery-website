import {useState} from "react";

export const useAddBasketBtn = (initialNum: number, idDish: string) => {
    const [dishNumber, setDishNumber] = useState(initialNum);

    const handleAddBasket = () => {
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