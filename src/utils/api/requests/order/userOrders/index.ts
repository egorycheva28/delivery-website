import { instance } from '../../../instance';
import {ORDER_API_URL} from "@/utils/constants/apiUrl.ts";

export interface GetUserOrdersByIdParams {
    id: string;
}

export type GetUserOrdersByIdConfig = RequestConfig<GetUserOrdersByIdParams>;

export const getUserOrdersById = async ({ config, params }: GetUserOrdersByIdConfig) =>
    instance.get<Order[]>(`${ORDER_API_URL}/find-by-userId/${params.id}`, config);