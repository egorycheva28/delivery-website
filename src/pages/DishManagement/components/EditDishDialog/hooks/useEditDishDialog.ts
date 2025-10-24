import { useForm } from "react-hook-form"
import { editDishSchema } from "../constants/EditDishShema"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePutUpdateDishMutation } from "@/utils/api/hooks/usePutUpdateDishMutation"

export const useEditDishDialog = (
    setIsOpen: (isOpen: boolean) => void, isOpen: boolean,
    editedDish: EditDishDTO,
    reloadDishes: () => void,
    dish: Dish) => {
    const editDish = usePutUpdateDishMutation()

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

    const editDishForm = useForm<EditDishDTO>({
        resolver: zodResolver(editDishSchema),
        defaultValues: {
            name: editedDish.name || '',
            categoryId: editedDish.categoryId || '',
            price: editedDish.price || 0,
            rate: editedDish.rate || 0,
            photo: editedDish.photo || '',
            description: editedDish.description || '',
            ingredients: editedDish.ingredients || [],
            isAvailable: editedDish.isAvailable || true
        }
    })

    const onSubmit = editDishForm.handleSubmit(async (value) => {
        await editDish.mutateAsync({
            params: {
                id: dish.id, name: value.name, categoryId: value.categoryId,
                photo: value.photo, rate: value.rate,
                price: value.price, description: value.description,
                ingredients: value.ingredients, isAvailable: value.isAvailable
            }
        })

        reloadDishes()
        editDishForm.reset()
        setIsOpen(false)
    })

    useEffect(() => {
        if (!isOpen) {
            editDishForm.reset({
                name: '',
                categoryId: '',
                price: 0,
                rate: 0,
                photo: '',
                description: '',
                ingredients: [],
                isAvailable: true
            })
        }
    }, [isOpen])

    return {
        state: { selectedFile, ingredients },
        form: editDishForm,
        functions: {
            onSubmit,
            setSelectedFile,
            handleFileChange
        }
    }
}