import { instance } from "@/utils/api/instance";

export type PutAddDishToOrderParams = {
    orderId: string,
    dishId: string
};

export type PutAddDishToOrderConfig = RequestConfig<PutAddDishToOrderParams>;

export const putAddDishToOrder = async ({ config, params }: PutAddDishToOrderConfig) =>
    instance.put(`http://localhost:8080/order/add-dish/${params.orderId}?status=${params.dishId}`, config);