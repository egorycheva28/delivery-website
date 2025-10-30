import { useMutation } from '@tanstack/react-query';
import {deleteDishIntoCart, type DeleteDishIntoCartConfig} from "@/utils/api/requests/cart/{id}/remove";

export const useDeleteDishIntoCartMutation = (
    settings?: MutationSettings<DeleteDishIntoCartConfig, typeof deleteDishIntoCart>
) =>
    useMutation({
        mutationKey: ['deleteDishIntoCart'],
        mutationFn: ({ params, config }) =>
            deleteDishIntoCart({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });