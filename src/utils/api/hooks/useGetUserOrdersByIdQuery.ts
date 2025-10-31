import { useQuery } from '@tanstack/react-query';

import {getUserOrdersById, type GetUserOrdersByIdParams} from "@/utils/api/requests/order/userOrders";

export const useGetUserOrdersByIdQuery = (
    params: GetUserOrdersByIdParams,
    settings?: QuerySettings<typeof getUserOrdersById>
) =>
    useQuery({
        queryKey: ['getUserOrdersById', params.id],
        queryFn: () => getUserOrdersById({ config: settings?.config, params }),
        ...settings?.options
    });