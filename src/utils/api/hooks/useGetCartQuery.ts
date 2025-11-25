import { useQuery } from '@tanstack/react-query';

import {getCart, type GetCartParams} from "@/utils/api/requests/cart/get";

export const useGetCartQuery = (
    params: GetCartParams,
    settings?: QuerySettings<typeof getCart>
) =>
    useQuery({
        queryKey: ['getCart', params.basketId],
        queryFn: () => getCart({ config: settings?.config, params }),
        ...settings?.options
    });