import {useParams} from "react-router-dom";

export const useDishDetail = () => {
    const { id } = useParams<{ id: string }>();

    const dish = {
        id: id || '',
        name: id,
        category: "string",
        description: "Проснись вместе со вкусом лета! Наш фруктовый завтрак — это взрыв свежести и витаминов в первой половине дня. Сочные дольки манго, хрустящие яблоки, спелые ягоды клубники и сладкий виноград — идеально сбалансированное сочетание для лёгкого старта.",
        price: 500,
        rating: 3.5,
        ingredients: ["Яблоко", "Банан", "Виноград", "Мандарин", "Фирменный соус", "Дыня"],
        photos: []
    }

    return {
        state: { dish }
    }
}