import { instance } from '@/utils/api/instance';

export type PostAddDishIntoCartParams = {
    dishId: string,
    name: string,
    price: number,
    imageUrl?: string,
    quantity: number
};

export type PostAddDishIntoCartConfig = RequestConfig<PostAddDishIntoCartParams>;

export const postAddDishIntoCart = async ({ config, params }: PostAddDishIntoCartConfig) =>
    instance.post(`http://localhost:5621/api/Cart/add`, params, config);