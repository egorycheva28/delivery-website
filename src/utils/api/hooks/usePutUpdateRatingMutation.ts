import { useMutation } from '@tanstack/react-query';
import {putUpdateRating, type PutUpdateRatingConfig} from "@/utils/api/requests/rating/edit";

export const usePutUpdateRatingMutation = (
    settings?: MutationSettings<PutUpdateRatingConfig, typeof putUpdateRating>
) =>
    useMutation({
        mutationKey: ['putUpdateRating'],
        mutationFn: ({ params, config }) =>
            putUpdateRating({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });