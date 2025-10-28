import { instance } from '../../../../instance';

export type PutChangeOrderStatusParams = {
    orderId: string,
    status: string
};

export type PutChangeOrderStatusConfig = RequestConfig<PutChangeOrderStatusParams>;

export const putChangeOrderStatus = async ({ config, params }: PutChangeOrderStatusConfig) =>
    instance.put(`http://localhost:8080/api/order/change-order-status/${params.orderId}?status=${params.status}`, config);