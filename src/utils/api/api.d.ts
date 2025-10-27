interface About {
    companyName: string,
    contactEmail: string,
    mailAddress: string,
    managerPhone: string,
    operatorPhone: string
}

interface DetailAbout extends About {
    id: string
}

interface Operator {
    id: string;
    role: string;
    createTime: string;
    fullName: string;
    phone: string;
    username: string;
}

interface NewOperatorDTO {
    fullName: string;
    password: string;
    phone: string;
    username: string;
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
    ingredients: string[];
}

interface GetDetailDish {
    foodDetails: DetailDish;
    couldRate: boolean;
    hasRate: boolean;
    userRating: number;
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

interface ItemCart {
    dishId: string,
    name: string,
    price: number,
    imageUrl?: string,
    quantity: number
}

interface Cart {
    total: number,
    items: ItemCart[]
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

interface EditDishDTO {
    name: string;
    categoryId: string;
    photo?: string;
    rate: number;
    price: number;
    description: string;
    ingredients: string[];
    isAvailable: boolean;
}

interface Token {
    accessToken: string;
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