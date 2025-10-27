import { useMutation } from '@tanstack/react-query';

import {postAddDishIntoCart, type PostAddDishIntoCartConfig} from "@/utils/api/requests/cart/add";

export const usePostAddDishIntoCartMutation = (
    settings?: MutationSettings<PostAddDishIntoCartConfig, typeof postAddDishIntoCart>
) =>
    useMutation({
        mutationKey: ['postAddDishIntoCart'],
        mutationFn: ({ params, config }) =>
            postAddDishIntoCart({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });