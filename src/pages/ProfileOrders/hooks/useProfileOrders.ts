import {useGetUserOrdersByIdQuery} from "@/utils/api/hooks/useGetUserOrdersByIdQuery.ts";
import {useAuth} from "@/utils/contexts/auth";

export const useProfileOrders = () => {
    const { userId } = useAuth()

    const userOrders = useGetUserOrdersByIdQuery({ id: userId })

    return {
        state: { userOrders }
    }
}