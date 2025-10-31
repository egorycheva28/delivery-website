import { instance } from '../../../instance';

export type PutUpdateRatingParams = {
    id: string;
    rating: number;
};

export type PutUpdateRatingConfig = RequestConfig<PutUpdateRatingParams>;

export const putUpdateRating = async ({ config, params }: PutUpdateRatingConfig) =>
    instance.put(`http://localhost:8080/api/rate/${params.id}`, params, config);