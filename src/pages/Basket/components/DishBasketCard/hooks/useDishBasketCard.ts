import {useDeleteDishIntoCartMutation} from "@/utils/api/hooks/useDeleteDishIntoCartMutation.ts";

export const useDishBasketCard = (dishId: string, reload: () => void) => {
    const deleteDishIntoCart = useDeleteDishIntoCartMutation()

    const handleDeleteDishIntoCart = async () => {
        await deleteDishIntoCart.mutateAsync({ params: { dishId } }, {
            onSuccess: () => {
                if (reload) reload()
            }
        })
    }

    return {
        functions: { handleDeleteDishIntoCart }
    }
}