import { useMutation } from '@tanstack/react-query';

import {deleteOneDish, type DeleteOneDishConfig} from "@/utils/api/requests/cart/update";

export const useDeleteOneDishMutation = (
    settings?: MutationSettings<DeleteOneDishConfig, typeof deleteOneDish>
) =>
    useMutation({
        mutationKey: ['deleteOneDish'],
        mutationFn: ({ params, config }) =>
            deleteOneDish({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });