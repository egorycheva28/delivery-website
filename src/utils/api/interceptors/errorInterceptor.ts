import type { AxiosError } from 'axios';

import {ValidationError} from "ajv";
import {USER_TOKEN} from "../../constants/token";

export const errorInterceptor = (error: AxiosError<ValidationError>) => {
    if (error.response?.status === 401) {
        localStorage.removeItem(USER_TOKEN);
        if (window.location.pathname !== '/') {
            window.location.href = '/';
        }
    }
    return Promise.reject(error);
};