import { instance } from '@/utils/api/instance';

export interface GetOrdersWithFiltersParams {
    operatorName?: string[],
    status?: string[],
    page: number,
    size: number,
    sort: string[]
}

export type GetOrdersWithFiltersConfig = RequestConfig<GetOrdersWithFiltersParams>;

export const getOrdersWithFilters = ({ params, config }: GetOrdersWithFiltersConfig) =>
    instance.get<OrderAnswer>(`http://localhost:8080/api/order/get-with-filters?operatorName=${params.operatorName}&status=${params.status}&page=${params.page}&size=${params.size}&sort=${params.sort}`, config);