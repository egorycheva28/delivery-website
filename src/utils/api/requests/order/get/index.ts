import { instance } from '@/utils/api/instance';

export type GetOrdersConfig = RequestConfig;

export const getStateOrder = async ({ config }: GetOrdersConfig) =>
    instance.get<Stat[]>(`http://localhost:8096/order/stat/all`, config);