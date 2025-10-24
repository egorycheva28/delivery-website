interface EditAboutDTO {
    name: string,
    phoneOperator: string,
    phoneManager: string,
    email: string,
    address: string,
    information: string
}

interface NewOperatorDTO {
    name: string;
    phone: string;
    password: string;
}

interface OperatorDTO {
    name: string;
    phone: string;
}

interface Dish {
    id: string;
    name: string;
    categoryId: string;
    description: string;
    price: number;
    rate: number;
    photo?: string;
    isAvailable: boolean;
}

interface DetailDish extends Dish {
    ingredients: string[]
}

interface Categories {
    id: string,
    name: string,
    description: string
}

interface Stat {
    id: string,
    operatorName: string,
    orderAmount: number
}

interface Order {
    id: string;
    number: number;
    date: string;
    address: string;
    price: number;
    status: string;
    payment: string;
    comment: string;
}

interface NewComment {
    newComment: string;
}

interface Status {
    id: string;
    name: string;
}

interface Reason {
    reason: string;
}

interface NewDishDTO {
    name: string;
    categoryId: string;
    photo?: string;
    rate: number;
    price: number;
    description: string;
    ingredients: string[];
}

interface MutationSettings<Params = void, Func = unknown> {
    config?: ApiRequestConfig;
    options?: import('@tanstack/react-query').UseMutationOptions<
        Awaited<ReturnType<Func>>,
        any,
        Params,
        any
    >;
}

interface QuerySettings<Func = unknown> {
    config?: ApiRequestConfig;
    options?: Omit<
        import('@tanstack/react-query').UseQueryOptions<
            Awaited<ReturnType<Func>>,
            any,
            Awaited<ReturnType<Func>>,
            any
        >,
        'queryKey'
    >;
}

interface InfiniteQuerySettings<Func = unknown> {
    config?: ApiRequestConfig;
    options?: Omit<
        import('@tanstack/react-query').UseInfiniteQueryOptions<
            Awaited<ReturnTyp<Func>>,
            any,
            Awaited<ReturnTyp<Func>>,
            any,
            import('@tanstack/react-query').QueryKey,
            string | undefined
        >,
        'queryKey'
    >;
}

type ApiRequestConfig = import('axios').AxiosRequestConfig;

type RequestConfig<Params = undefined> = Params extends undefined
    ? {
        config?: ApiRequestConfig;
    }
    : {
        params: Params;
        config?: ApiRequestConfig;
    };