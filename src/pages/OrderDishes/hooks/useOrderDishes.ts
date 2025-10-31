import {useParams} from "react-router-dom";
import {useGetOrderByIdQuery} from "@/utils/api/hooks/useGetOrderByIdQuery.ts";

export const useOrderDishes = () => {
    const { id } = useParams<{ id: string }>();

    const order = useGetOrderByIdQuery({ orderId: id! })

    return {
        state: { order }
    }
}