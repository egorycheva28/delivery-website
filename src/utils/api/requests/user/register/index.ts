import { instance } from '@/utils/api/instance';
import {USER_API_URL} from "@/utils/constants/apiUrl.ts";

export type PostRegisterParams = {
    fullName: string,
    phone: string,
    password: string
};

export type PostRegisterConfig = RequestConfig<PostRegisterParams>;

export const postRegister = async ({ config, params }: PostRegisterConfig) =>
    instance.post<Token>(`${USER_API_URL}/users/registration/client`, params, config);