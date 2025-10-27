import { instance } from '@/utils/api/instance';

export type PostLoginParams = {
    phone: string,
    password: string
};

export type PostLoginConfig = RequestConfig<PostLoginParams>;

export const postLogin = async ({ config, params }: PostLoginConfig) =>
    instance.post<Token>(`http://localhost:8910/api/auth/user/sign-in`, params, config);