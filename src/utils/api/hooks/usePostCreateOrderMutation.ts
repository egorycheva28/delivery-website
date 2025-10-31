import { useMutation } from '@tanstack/react-query';

import {postCreateOrder, type PostCreateOrderConfig} from "@/utils/api/requests/cart/createOrder";

export const usePostCreateOrderMutation = (
    settings?: MutationSettings<PostCreateOrderConfig, typeof postCreateOrder>
) =>
    useMutation({
        mutationKey: ['postCreateOrder'],
        mutationFn: ({ params, config }) =>
            postCreateOrder({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });