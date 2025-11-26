import { instance } from '@/utils/api/instance';

export type PostCreateOrderParams = {
    phoneNumber: string,
    address: string,
    paymentMethod: string,
    comment?: string
};

export type PostCreateOrderConfig = RequestConfig<PostCreateOrderParams>;

export const postCreateOrder = async ({ config, params }: PostCreateOrderConfig) =>
    instance.post(`http://localhost:5261/api/Cart/create-order`, params, config);