import { instance } from '../../../instance';

export interface GetUserByPhoneParams {
    phone: string;
}

export type GetUserByPhoneConfig = RequestConfig<GetUserByPhoneParams>;

export const getUserByPhone = async ({ config, params }: GetUserByPhoneConfig) =>
    instance.get<GetDetailDish>(`http://localhost:8910/api/users/find-by-phone`, {
        ...config,
        params: { ...config?.params, ...params }
    });