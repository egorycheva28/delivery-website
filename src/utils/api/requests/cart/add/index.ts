import { instance } from '@/utils/api/instance';

export type PostAddDishIntoCartParams = {
    dishId: string,
    name: string,
    price: number,
    imageUrl: string,
    quantity: number,
    createOrder: boolean
};

export type PostAddDishIntoCartConfig = RequestConfig<PostAddDishIntoCartParams>;

export const postAddDishIntoCart = async ({ config, params }: PostAddDishIntoCartConfig) =>
    instance.post(`https://localhost:44348/api/Cart/add`, params, config);