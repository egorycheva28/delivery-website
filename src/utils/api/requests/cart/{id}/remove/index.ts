import { instance } from '../../../../instance';
import {CART_API_URL} from "@/utils/constants/apiUrl.ts";

export interface DeleteDishIntoCartParams {
    dishId: string;
}

export type DeleteDishIntoCartConfig = RequestConfig<DeleteDishIntoCartParams>;

export const deleteDishIntoCart = async ({ config, params }: DeleteDishIntoCartConfig) =>
    instance.delete(`${CART_API_URL}/Cart/remove/${params.dishId}`, config);