import { instance } from '../../../instance';
import {MENU_API_URL} from "@/utils/constants/apiUrl.ts";

export type PostAddRatingParams = {
    id: string;
    rating: number;
};

export type PostAddRatingConfig = RequestConfig<PostAddRatingParams>;

export const postAddRating = async ({ config, params }: PostAddRatingConfig) =>
    instance.post(`${MENU_API_URL}/rate/${params.id}`, params, config);