import { instance } from '../../../instance';

export interface GetUserOrdersByIdParams {
    id: string;
}

export type GetUserOrdersByIdConfig = RequestConfig<GetUserOrdersByIdParams>;

export const getUserOrdersById = async ({ config, params }: GetUserOrdersByIdConfig) =>
    instance.get<Order[]>(`http://localhost:8096/order/find-by-userId/${params.id}`, config);