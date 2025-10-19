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
    category: string;
    description: string;
    price: number;
    rating: number;
    photos: string[];
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
    name: string,
    category: string,
    price: number,
    description: string,
    ingredients: string,
    photo: string
}