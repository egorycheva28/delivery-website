import { instance } from '../../../../instance';

export interface GetDishByIdParams {
    id: string;
}

export type GetDishByIdConfig = RequestConfig<GetDishByIdParams>;

export const getDishById = async ({ config, params }: GetDishByIdConfig) =>
    instance.get<DetailDish>(`http://localhost:8080/api/foods/${params.id}`, config);