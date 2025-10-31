import { useMutation } from '@tanstack/react-query';

import {deleteAllDishIntoCart, type DeleteAllDishIntoCartConfig} from "@/utils/api/requests/cart/deleteAll";

export const useDeleteAllDishIntoCartMutation = (
    settings?: MutationSettings<DeleteAllDishIntoCartConfig, typeof deleteAllDishIntoCart>
) =>
    useMutation({
        mutationKey: ['deleteAllDishIntoCart'],
        mutationFn: ({ config }) => deleteAllDishIntoCart({ config: { ...settings?.config, ...config } }),
        ...settings?.options
    });
