import { instance } from '../../../instance';

export type PostAddRatingParams = {
    id: string;
    rating: number;
};

export type PostAddRatingConfig = RequestConfig<PostAddRatingParams>;

export const postAddRating = async ({ config, params }: PostAddRatingConfig) =>
    instance.post(`http://localhost:8080/api/rate/${params.id}`, params, config);