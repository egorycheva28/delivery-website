import { instance } from '../../../instance.ts';

export type DeleteOneDishParams = {
    dishId: string,
    quantity: number
};

export type DeleteOneDishConfig = RequestConfig<DeleteOneDishParams>;

export const deleteOneDish = async ({ config, params }: DeleteOneDishConfig) =>
    instance.put(`https://localhost:44348/api/Cart/update`, params, config);