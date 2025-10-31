import {useParams} from "react-router-dom";
import {useGetDishByIdQuery} from "@/utils/api/hooks/useGetDishByIdQuery.ts";
import {useGetCartQuery} from "@/utils/api/hooks/useGetCartQuery.ts";
import {useMemo} from "react";

export const useDishDetail = () => {
    const { id } = useParams<{ id: string }>();

    const cart = useGetCartQuery({ basketId: localStorage.getItem('basketId')! })
    const dish = useGetDishByIdQuery({ id: id! })

    const dishIntoCart = useMemo(() => {
        const dishItem = cart.data?.data.items.find(item => item.dishId === id)

        return {
            dishId: id!,
            name: dish.data?.data.foodDetails.name!,
            price: dish.data?.data.foodDetails.price!,
            imageUrl: dish.data?.data.foodDetails.photo!,
            quantity: dishItem?.quantity || 0
        };
    }, [cart.data, dish.data])

    return {
        state: { dish, dishIntoCart, cart }
    }
}