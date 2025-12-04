import { instance } from '../../../instance';
import {USER_API_URL} from "@/utils/constants/apiUrl.ts";

export interface GetUserByPhoneParams {
    phone: string;
}

export type GetUserByPhoneConfig = RequestConfig<GetUserByPhoneParams>;

export const getUserByPhone = async ({ config, params }: GetUserByPhoneConfig) =>
    instance.get<GetDetailDish>(`${USER_API_URL}/users/find-by-phone`, {
        ...config,
        params: { ...config?.params, ...params }
    });