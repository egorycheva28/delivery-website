import { usePutAddDishToOrderMutation } from "@/utils/api/hooks/usePutAddDishToOrder";
import { useState } from "react";

export const useAddOrderBtn = (initialNum: number, idDish: string, order: Order) => {
    const addDishIntoOrder = usePutAddDishToOrderMutation()

    const [dishNumber, setDishNumber] = useState(initialNum);

    const handleAddOrder = async () => {
        await addDishIntoOrder.mutateAsync({
            params: {
                orderId: order.id, dishId: idDish
            }
        })

        console.log("add " + idDish)
        setDishNumber(prev => prev + 1);
    }

    const handleRemoveOrder = () => {
        console.log("remove " + idDish)
        setDishNumber(prev => prev - 1);
    }

    return {
        state: { dishNumber },
        functions: { handleAddOrder, handleRemoveOrder }
    }
}