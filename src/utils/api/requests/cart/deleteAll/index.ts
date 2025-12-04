import { instance } from '../../../instance';
import {CART_API_URL} from "@/utils/constants/apiUrl.ts";

export type DeleteAllDishIntoCartConfig = RequestConfig;

export const deleteAllDishIntoCart = async ({ config }: DeleteAllDishIntoCartConfig) =>
    instance.delete(`${CART_API_URL}/Cart/clear`, config);
