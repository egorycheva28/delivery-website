import { useGetUserOrdersByIdQuery } from "@/utils/api/hooks/useGetUserOrdersByIdQuery.ts";
import { useAuth } from "@/utils/contexts/auth";

export const useProfileOrders = () => {
    const { userId } = useAuth()

    const userOrders = useGetUserOrdersByIdQuery({ id: userId })

    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        };

        return date.toLocaleString(undefined, options);
    }

    return {
        state: { userOrders },
        functions: { formatDateTime }
    }
}