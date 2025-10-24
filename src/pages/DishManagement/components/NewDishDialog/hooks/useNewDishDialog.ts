import { useForm } from "react-hook-form"
import { newDishSchema } from "../constants/NewDishShema"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostCreateDishMutation } from "@/utils/api/hooks/usePostCreateDishMutation";

export const useNewDishDialog = (
    setIsOpen: (isOpen: boolean) => void, isOpen: boolean,
    newDish: NewDishDTO,
    setNewDish: (NewDish: NewDishDTO) => void, reloadDishes: () => void) => {
    const createDish = usePostCreateDishMutation()

    const [selectedFile, setSelectedFile] = useState(null);
    const ingredients = [
        {
            id: "ONION",
            label: "Лук",
        },
        {
            id: "MEAT",
            label: "Мясо",
        },
        {
            id: "BIRD",
            label: "Птица",
        },
        {
            id: "FISH",
            label: "Рыба",
        },
        {
            id: "EGGS",
            label: "Яйца",
        },
        {
            id: "NUTS",
            label: "Орехи",
        },
        {
            id: "MILKY_PRODUCTS",
            label: "Молочные продукты",
        },
        {
            id: "BERRIES",
            label: "Ягоды",
        },
        {
            id: "GRASS",
            label: "Зелень",
        },
        {
            id: "SPICY",
            label: "Острое",
        }
    ] as const

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        //setNewDish(); потом поправить
    };

    const newDishForm = useForm<NewDishDTO>({
        resolver: zodResolver(newDishSchema),
        defaultValues: {
            name: newDish.name || '',
            categoryId: newDish.categoryId || '',
            price: newDish.price || 0,
            rate: newDish.rate || 0,
            photo: newDish.photo || '',
            description: newDish.description || '',
            ingredients: newDish.ingredients || []
        }
    })

    const onSubmit = newDishForm.handleSubmit(async (value) => {
        await createDish.mutateAsync({
            params: {
                name: value.name, categoryId: value.categoryId,
                photo: value.photo, rate: value.rate,
                price: value.price, description: value.description,
                ingredients: value.ingredients
            }
        })

        reloadDishes()
        newDishForm.reset()
        setIsOpen(false)
    })

    useEffect(() => {
        if (!isOpen) {
            newDishForm.reset({
                name: '',
                categoryId: '',
                price: 0,
                rate: 0,
                photo: '',
                description: '',
                ingredients: []
            })
        }
    }, [isOpen])

    return {
        state: { selectedFile, ingredients },
        form: newDishForm,
        functions: {
            onSubmit,
            setSelectedFile,
            handleFileChange
        }
    }
}