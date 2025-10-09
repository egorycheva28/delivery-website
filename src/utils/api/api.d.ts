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
    category: string;
    description: string;
    price: number;
    rating: number;
    photos: string[];
}