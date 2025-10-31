import { instance } from '@/utils/api/instance';

export type PostCreateOrderParams = {
    phoneNumber: string,
    address: string,
    paymentMethod: string,
    comment?: string
};

export type PostCreateOrderConfig = RequestConfig<PostCreateOrderParams>;

export const postCreateOrder = async ({ config, params }: PostCreateOrderConfig) =>
    instance.post(`https://localhost:44348/api/Cart/create-order`, params, config);