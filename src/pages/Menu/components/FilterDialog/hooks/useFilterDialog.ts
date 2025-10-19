import type {GetFilterSchema} from "@/pages/Menu/components/FilterDialog/constants/FilterSchema.ts";
import {useForm} from "react-hook-form";
import type {GetFoodsWithFilterParams} from "@/utils/api/requests/foods/filter";

export const useFilterDialog = (filters: GetFoodsWithFilterParams,
    setFilters: (filters: GetFoodsWithFilterParams) => void,
    setIsOpen: (isOpen: boolean) => void) => {
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

    const filterForm = useForm<GetFilterSchema>({
        defaultValues: {
            ingredients: filters.includeIngredients || [],
            min_price: filters.minPrice || undefined,
            max_price: filters.maxPrice || undefined
        }
    })

    const onSubmit = filterForm.handleSubmit(
        (data) => {
            setFilters({ ...filters,
                includeIngredients: data.ingredients,
                minPrice: data.min_price,
                maxPrice: data.max_price
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