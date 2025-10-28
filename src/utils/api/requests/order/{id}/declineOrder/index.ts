import { instance } from '../../../../instance';

export type PutDeclineOrderParams = {
    orderId: string,
    declineReason: string
};

export type PutDeclineOrderConfig = RequestConfig<PutDeclineOrderParams>;

export const putDeclineOrder = async ({ config, params }: PutDeclineOrderConfig) =>
    instance.put(`http://localhost:8080/api/order/decline?orderId=${params.orderId}&declineReason=${params.declineReason}`, config);