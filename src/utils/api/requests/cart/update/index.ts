import { instance } from '../../../instance.ts';

export type DeleteOneDishParams = {
    dishId: string,
    quantity: number
};

export type DeleteOneDishConfig = RequestConfig<DeleteOneDishParams>;

export const deleteOneDish = async ({ config, params }: DeleteOneDishConfig) =>
    instance.put(`http://localhost:5261/api/Cart/update`, params, config);