import { instance } from '../../../instance.ts';
import {CART_API_URL} from "@/utils/constants/apiUrl.ts";

export type DeleteOneDishParams = {
    dishId: string,
    quantity: number
};

export type DeleteOneDishConfig = RequestConfig<DeleteOneDishParams>;

export const deleteOneDish = async ({ config, params }: DeleteOneDishConfig) =>
    instance.put(`${CART_API_URL}/Cart/update`, params, config);