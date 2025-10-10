import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { GetFilterSchema } from "../constants/FilterSchema"

export const useFilterDialog = (
    setIsOpen: (isOpen: boolean) => void, isOpen: boolean) => {

    const ingredients = [
        {
            id: "onion",
            label: "Лук",
        },
        {
            id: "meat",
            label: "Мясо",
        },
        {
            id: "bird",
            label: "Птица",
        },
        {
            id: "fish",
            label: "Рыба",
        },
        {
            id: "eggs",
            label: "Яйца",
        },
        {
            id: "nuts",
            label: "Орехи",
        },
        {
            id: "dairyProducts",
            label: "Молочные продукты",
        },
        {
            id: "berries",
            label: "Ягоды",
        },
        {
            id: "greens",
            label: "Зелень",
        },
        {
            id: "sharp",
            label: "Острое",
        }
    ] as const

    const filterForm = useForm<GetFilterSchema>({
        defaultValues: {

        }
    })

    const onSubmit = filterForm.handleSubmit(
        (data) => {

            setIsOpen(false)
        }
    )

    useEffect(() => {
        if (!isOpen) {
            filterForm.reset({

            })
        }
    }, [isOpen])

    return {
        state: { ingredients },
        form: filterForm,
        functions: { onSubmit }
    }
}