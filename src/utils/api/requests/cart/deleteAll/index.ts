import { instance } from '../../../instance';

export type DeleteAllDishIntoCartConfig = RequestConfig;

export const deleteAllDishIntoCart = async ({ config }: DeleteAllDishIntoCartConfig) =>
    instance.delete(`https://localhost:44348/api/Cart/clear`, config);
