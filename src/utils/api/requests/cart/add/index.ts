import { instance } from '@/utils/api/instance';
import {CART_API_URL} from "@/utils/constants/apiUrl.ts";

export type PostAddDishIntoCartParams = {
    dishId: string,
    name: string,
    price: number,
    imageUrl?: string,
    quantity: number
};

export type PostAddDishIntoCartConfig = RequestConfig<PostAddDishIntoCartParams>;

export const postAddDishIntoCart = async ({ config, params }: PostAddDishIntoCartConfig) =>
    instance.post(`${CART_API_URL}/Cart/add`, params, config);