import { instance } from '../../../instance';
import {MENU_API_URL} from "@/utils/constants/apiUrl.ts";

export type PutUpdateRatingParams = {
    id: string;
    rating: number;
};

export type PutUpdateRatingConfig = RequestConfig<PutUpdateRatingParams>;

export const putUpdateRating = async ({ config, params }: PutUpdateRatingConfig) =>
    instance.put(`${MENU_API_URL}/rate/${params.id}`, params, config);