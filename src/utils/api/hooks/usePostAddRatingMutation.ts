import { useMutation } from '@tanstack/react-query';
import {postAddRating, type PostAddRatingConfig} from "@/utils/api/requests/rating/add";

export const usePostAddRatingMutation = (
    settings?: MutationSettings<PostAddRatingConfig, typeof postAddRating>
) =>
    useMutation({
        mutationKey: ['postAddRating'],
        mutationFn: ({ params, config }) =>
            postAddRating({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });