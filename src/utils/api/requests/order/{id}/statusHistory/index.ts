import { instance } from '../../../../instance';

export interface GetStatusHistoryParams {
    orderId: string;
}

export type GetStatusHistoryConfig = RequestConfig<GetStatusHistoryParams>;

export const getStatusHistory = async ({ config, params }: GetStatusHistoryConfig) =>
    instance.get<StatusHistory[]>(`http://localhost:8080/api/order/get-status-history/${params.orderId}`, config);