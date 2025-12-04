import { instance } from '@/utils/api/instance';
import {CART_API_URL} from "@/utils/constants/apiUrl.ts";

export type PostCreateOrderParams = {
    phoneNumber: string,
    address: string,
    paymentMethod: string,
    comment?: string
};

export type PostCreateOrderConfig = RequestConfig<PostCreateOrderParams>;

export const postCreateOrder = async ({ config, params }: PostCreateOrderConfig) =>
    instance.post(`${CART_API_URL}/Cart/create-order`, params, config);