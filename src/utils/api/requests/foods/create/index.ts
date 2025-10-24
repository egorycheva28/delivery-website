import { instance } from '@/utils/api/instance';

export type PostCreateDishParams = {
    name: string,
    categoryId: string,
    photo?: string,
    rate: number,
    price: number,
    description: string,
    ingredients: string[]
};

export type PostCreateDishConfig = RequestConfig<PostCreateDishParams>;

export const postCreateDish = async ({ config, params }: PostCreateDishConfig) =>
    instance.post<DetailDish>(`http://localhost:8910/api/foods`, params, config);