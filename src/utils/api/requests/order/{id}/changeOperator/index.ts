import { instance } from '../../../../instance';

export type PutChangeOperatorParams = {
    orderId: string,
    operatorId: string
};

export type PutChangeOperatorConfig = RequestConfig<PutChangeOperatorParams>;

export const putChangeOperator = async ({ config, params }: PutChangeOperatorConfig) =>
    instance.put(`http://localhost:8080/api/order/change-operator-for-order?orderId=${params.orderId}&operatorId=${params.operatorId}`, config);