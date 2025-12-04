import { instance } from '@/utils/api/instance';
import {USER_API_URL} from "@/utils/constants/apiUrl.ts";

export type PostLoginParams = {
    phone: string,
    password: string
};

export type PostLoginConfig = RequestConfig<PostLoginParams>;

export const postLogin = async ({ config, params }: PostLoginConfig) =>
    instance.post<Token>(`${USER_API_URL}/auth/user/sign-in`, params, config);