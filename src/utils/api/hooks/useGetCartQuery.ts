import { useQuery } from '@tanstack/react-query';

import {getCart} from "@/utils/api/requests/cart/get";

export const useGetCartQuery = (settings?: QuerySettings<typeof getCart>) =>
    useQuery({
        queryKey: ['getCart'],
        queryFn: () => getCart({ config: settings?.config }),
        ...settings?.options
    });