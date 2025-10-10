import { useState } from "react";

export const useDishManagement = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [available, setAvailable] = useState<boolean>(false);
    const [editDishId, setEditDishId] = useState<string | null>(null)
    const [newDish, setNewDish] = useState<NewDishDTO>({
        name: 'string',
        category: 'string',
        price: 500,
        description: 'string',
        ingredients: 'string',
        photo: 'string'
    });
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

    const deleteDish = () => {

    }

    const doAvailable = () => {
        setAvailable(!available)

    }

    return {
        state: { isOpen, dishes, available, editDishId, newDish },
        functions: {
            setIsOpen,
            deleteDish,
            setAvailable,
            doAvailable,
            setEditDishId,
            setNewDish
        }
    }
}
