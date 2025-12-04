import { instance } from '../../../instance';
import {CART_API_URL} from "@/utils/constants/apiUrl.ts";

export interface GetCartParams {
    basketId: string;
}

export type GetCartConfig = RequestConfig<GetCartParams>;

export const getCart = async ({ config, params }: GetCartConfig) =>
    instance.get<Cart>(`${CART_API_URL}/Cart`, {
        ...config,
        params: { ...config?.params, ...params }
    });