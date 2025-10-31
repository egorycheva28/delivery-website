import { useMutation } from '@tanstack/react-query';
import { getUserByPhone, type GetUserByPhoneConfig } from "@/utils/api/requests/user/getByNumber";

export const useGetUserByPhoneMutation = (
    settings?: MutationSettings<GetUserByPhoneConfig, typeof getUserByPhone>
) =>
    useMutation({
        mutationKey: ['getUserByPhone'],
        mutationFn: ({ params, config }) =>
            getUserByPhone({ params, config: { ...settings?.config, ...config } }),
        ...settings?.options
    });