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

interface UserProfileDTO{
    name: string;
    phone: string;
    password: string;
}

interface UserNewPasswordDTO{
    oldPassword1: string;
    newPassword1: string;
    newPassword2: string;
}

interface ShortUserOrdersDTO{
    inProcess: number;
    completed: number;
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

interface NewDishDTO {
    name: string,
    category: string,
    price: number,
    description: string,
    ingredients: string,
    photo: string
}