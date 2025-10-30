import { instance } from '../../../instance';

export interface GetCartParams {
    basketId: string;
}

export type GetCartConfig = RequestConfig<GetCartParams>;

export const getCart = async ({ config, params }: GetCartConfig) =>
    instance.get<Cart>(`https://localhost:44348/api/Cart`, {
        ...config,
        params: { ...config?.params, ...params }
    });