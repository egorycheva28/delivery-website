import type {GetFilterSchema} from "@/pages/Menu/components/FilterDialog/constants/FilterSchema.ts";
import {useForm} from "react-hook-form";
import type {DishListFilters} from "@/pages/Menu/hooks/useMenu.ts";

export const useFilterDialog = (filters: DishListFilters,
    setFilters: (filters: DishListFilters) => void,
    setIsOpen: (isOpen: boolean) => void) => {
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
            ingredients: filters.ingredients || [],
            min_price: filters.min_price || undefined,
            max_price: filters.max_price || undefined
        }
    })

    const onSubmit = filterForm.handleSubmit(
        (data) => {
            setFilters({ ...filters,
                ingredients: data.ingredients,
                min_price: data.min_price,
                max_price: data.max_price
            })
            setIsOpen(false)
        }
    )

    return {
        state: { ingredients },
        form: filterForm,
        functions: { onSubmit }
    }
}