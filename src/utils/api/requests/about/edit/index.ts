import { instance } from '@/utils/api/instance';

export type PutEditAboutParams = {
    name: string,
    phoneOperator: string,
    phoneManager: string,
    email: string,
    address: string
};

export type PutEditAboutConfig = RequestConfig<PutEditAboutParams>;

export const putEditAbout = async ({ config, params }: PutEditAboutConfig) =>
    instance.put<About>(`http://localhost:8910/api/about`, params, config);