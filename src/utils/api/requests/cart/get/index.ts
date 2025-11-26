import { instance } from '../../../instance';

export interface GetCartParams {
    basketId: string;
}

export type GetCartConfig = RequestConfig<GetCartParams>;

export const getCart = async ({ config, params }: GetCartConfig) =>
    instance.get<Cart>(`http://localhost:5261/api/Cart`, {
        ...config,
        params: { ...config?.params, ...params }
    });