import {useState} from "react";
import {usePostAddDishIntoCartMutation} from "@/utils/api/hooks/usePostAddDishIntoCart.ts";
import {useDeleteOneDishMutation} from "@/utils/api/hooks/useDeleteOneDishMutation.ts";
import {useDeleteDishIntoCartMutation} from "@/utils/api/hooks/useDeleteDishIntoCartMutation.ts";
import {DISH_COUNT_NOT_UPDATE} from "@/utils/constants/envBugs.ts";

export const useAddBasketBtn = (dishId: string, name: string, price: number, quantity: number, reload?: () => void, imageUrl?: string) => {
    const addDishIntoCart = usePostAddDishIntoCartMutation()
    const deleteOneDish = useDeleteOneDishMutation()
    const deleteDishIntoCart = useDeleteDishIntoCartMutation()

    const [dishNumber, setDishNumber] = useState(quantity);

    const handleAddBasket = async () => {
        if (!DISH_COUNT_NOT_UPDATE) {
            await addDishIntoCart.mutateAsync({ params: { dishId, name, price, quantity: 1, imageUrl } }, {
                onSuccess: () => {
                    setDishNumber(prev => prev + 1);
                    if (reload) reload()
                }
            })
        } else {
            setDishNumber(prev => prev + 1);
        }
    }

    const handleRemoveBasket = async () => {
        if (dishNumber > 1) {
            if (!DISH_COUNT_NOT_UPDATE) {
                await deleteOneDish.mutateAsync({ params: { dishId, quantity: dishNumber - 1 } }, {
                    onSuccess: () => {
                        setDishNumber(prev => prev - 1);
                        if (reload) reload()
                    }
                })
            } else {
                setDishNumber(prev => prev - 1);
            }
        } else {
            if (!DISH_COUNT_NOT_UPDATE) {
                await deleteDishIntoCart.mutateAsync({ params: { dishId } }, {
                    onSuccess: () => {
                        setDishNumber(prev => prev - 1);
                        if (reload) reload()
                    }
                })
            } else {
                setDishNumber(prev => prev - 1);
            }
        }
    }

    return {
        state: { dishNumber },
        functions: { handleAddBasket, handleRemoveBasket }
    }
}