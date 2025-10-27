import { instance } from '../../../../instance';

export interface GetOrderByIdParams {
    orderId: string;
}

export type GetOrderByIdConfig = RequestConfig<GetOrderByIdParams>;

export const getOrderById = async ({ config, params }: GetOrderByIdConfig) =>
    instance.get<Order>(`http://localhost:8080/api/order/find-by/${params.orderId}`, config);