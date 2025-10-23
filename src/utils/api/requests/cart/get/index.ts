import { instance } from '@/utils/api/instance';

export type GetCartConfig = RequestConfig;

export const getCart = async ({ config }: GetCartConfig) =>
    instance.get<Cart>(`https://localhost:44348/api/Cart`, config);