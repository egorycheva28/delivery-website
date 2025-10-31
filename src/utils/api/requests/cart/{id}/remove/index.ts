import { instance } from '../../../../instance';

export interface DeleteDishIntoCartParams {
    dishId: string;
}

export type DeleteDishIntoCartConfig = RequestConfig<DeleteDishIntoCartParams>;

export const deleteDishIntoCart = async ({ config, params }: DeleteDishIntoCartConfig) =>
    instance.delete(`https://localhost:44348/api/Cart/remove/${params.dishId}`, config);