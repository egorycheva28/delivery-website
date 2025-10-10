import {useState} from "react";
import type {
    DishCategorySchema
} from "@/pages/DishCategory/components/DishCategoryDialog/constants/DishCategorySchema.ts";

export const useDishCategory = () => {
    const categories = [
        {
            id: "string1",
            name: "Category 1",
            description: "Проснись вместе со вкусом лета! Наш фруктовый завтрак — это взрыв свежести и витаминов в первой половине дня. Сочные дольки манго, хрустящие яблоки, спелые ягоды клубники и сладкий виноград — идеально сбалансированное сочетание для лёгкого старта.",
            relatedDishes: ["fruit"]
        },
        {
            id: "string2",
            name: "Category 1",
            description: "Description 1",
            relatedDishes: []
        },
        {
            id: "string3",
            name: "Category 1",
            description: "Description 1",
            relatedDishes: []
        },
        {
            id: "string4",
            name: "Category 1",
            description: "Description 1",
            relatedDishes: []
        },
        {
            id: "string5",
            name: "Category 1",
            description: "Description 1",
            relatedDishes: []
        },
        {
            id: "string6",
            name: "Category 1",
            description: "Description 1",
            relatedDishes: []
        },
        {
            id: "string7",
            name: "Category 1",
            description: "Description 1",
            relatedDishes: []
        }
    ]

    const [categoryData, setCategoryData] = useState<DishCategorySchema | undefined>(undefined)
    const [categoryId, setCategoryId] = useState<string | undefined>(undefined)
    const [isOpen, setIsOpen] = useState(false)
    const [canselDeleteOpen, setCanselDeleteOpen] = useState(false)

    const openEditCategory = (dishCategory: DishCategorySchema, id: string) => {
        setCategoryData(dishCategory)
        setCategoryId(id)
        setIsOpen(true)
    }

    const openCreateCategory = () => {
        setCategoryData(undefined)
        setCategoryId(undefined)
        setIsOpen(true)
    }

    return {
        state: { categories, categoryId, isOpen, categoryData, canselDeleteOpen },
        functions: { setIsOpen, openEditCategory, openCreateCategory, setCanselDeleteOpen }
    }
}