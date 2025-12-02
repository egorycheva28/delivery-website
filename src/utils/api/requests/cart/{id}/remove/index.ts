import { instance } from '../../../../instance';

export interface DeleteDishIntoCartParams {
    dishId: string;
}

export type DeleteDishIntoCartConfig = RequestConfig<DeleteDishIntoCartParams>;

export const deleteDishIntoCart = async ({ config, params }: DeleteDishIntoCartConfig) =>
    instance.delete(`http://localhost:5621/api/Cart/remove/${params.dishId}`, config);