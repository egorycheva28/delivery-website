import { useEffect } from "react"

export const useAddDishDialog = (isAddDish: boolean) => {
    const dishes = [
        {
            id: "string1",
            name: "string",
            category: "string",
            description: "Проснись вместе со вкусом лета! Наш фруктовый завтрак — это взрыв свежести и витаминов в первой половине дня. Сочные дольки манго, хрустящие яблоки, спелые ягоды клубники и сладкий виноград — идеально сбалансированное сочетание для лёгкого старта.",
            price: 500,
            rating: 3.5,
            photos: []
        },
        {
            id: "string2",
            name: "string",
            category: "string",
            description: "string",
            price: 500,
            rating: 3.5,
            photos: []
        },
        {
            id: "string3",
            name: "string",
            category: "string",
            description: "string",
            price: 500,
            rating: 3.5,
            photos: []
        },
        {
            id: "string4",
            name: "string",
            category: "string",
            description: "string",
            price: 500,
            rating: 3.5,
            photos: []
        },
        {
            id: "string5",
            name: "string",
            category: "string",
            description: "string",
            price: 500,
            rating: 3.5,
            photos: []
        },
        {
            id: "string6",
            name: "string",
            category: "string",
            description: "string",
            price: 500,
            rating: 3.5,
            photos: []
        },
        {
            id: "string7",
            name: "string",
            category: "string",
            description: "string",
            price: 500,
            rating: 3.5,
            photos: []
        }
    ]

    useEffect(() => {
        //логика получения меню
    }, [isAddDish]);

    return {
        state: { dishes }
    }
}