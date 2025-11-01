import { useGetFoodsWithFiltersQuery } from "@/utils/api/hooks/useGetFoodsWithFiltersQuery";
import { useMemo } from "react";

const ITEMS_PER_PAGE = 8;
export const useAddDishDialog = (setIsAddDish: (isAddDish: boolean) => void) => {
    const dishes = useGetFoodsWithFiltersQuery({
        search: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        categoryId: undefined,
        sortBy: undefined,
        sortDirection: undefined,
        includeIngredients: undefined
    })

    const reloadDishes = () => {
        dishes.refetch;
        setIsAddDish(false);
    }

    const totalPage = useMemo(() => {
        if (!dishes.data) return 0

        return Math.ceil(dishes.data.data.length / ITEMS_PER_PAGE);
    }, [dishes.data]);

    return {
        state: { dishes, totalPage },
        functions: { reloadDishes }
    }
}