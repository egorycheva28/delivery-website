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