import { instance } from '../../../instance';

export type DeleteAllDishIntoCartConfig = RequestConfig;

export const deleteAllDishIntoCart = async ({ config }: DeleteAllDishIntoCartConfig) =>
    instance.delete(`http://localhost:5621/api/Cart/clear`, config);
