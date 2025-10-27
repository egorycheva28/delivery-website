import { instance } from '@/utils/api/instance';

export type PostRegisterParams = {
    fullName: string,
    phone: string,
    password: string
};

export type PostRegisterConfig = RequestConfig<PostRegisterParams>;

export const postRegister = async ({ config, params }: PostRegisterConfig) =>
    instance.post<Token>(`http://localhost:8910/api/users/registration/client`, params, config);