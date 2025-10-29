import { instance } from '@/utils/api/instance';

export interface GetMyOrdersParams {
    operatorId: string,
    page: number,
    size: number,
    sort: string[]
}

export type GetMyOrdersConfig = RequestConfig<GetMyOrdersParams>;

export const getMyOrders = async ({ config, params }: GetMyOrdersConfig) =>
    instance.get<OrderAnswer>(`http://localhost:8096/order/find-by-operator?operatorId=${params.operatorId}&page=${params.page}&size=${params.size}&sort=${params.sort}`, config);