import {useState} from "react";
import {useDebounceCallback} from "@/utils/hooks/useDebounceCallback/useDebounceCallback.ts";

//Потом перенести этот интерфейс в запросы
export interface DishListFilters {
    name?: string;
    dish_category?: string,
    sorting?: string,
    min_price?: number,
    max_price?: number,
    ingredients?: string[]
}

const SEARCH_TIMEOUT = 500;
export const useMenu = () => {
    const [filters, setFilters] = useState<DishListFilters>({});
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelectSorting = (sorting: string) => {
        setFilters({ ...filters, sorting })
    }

    const handleSelectCategory = (dish_category: string) => {
        setFilters({ ...filters, dish_category });
    }

    const debouncedSearchByName = useDebounceCallback((name: string) => {
        setFilters({ ...filters, name });
    }, SEARCH_TIMEOUT);

    return {
        state: { isOpen, filters },
        functions: {
            debouncedSearchByName,
            handleSelectCategory,
            handleSelectSorting,
            setIsOpen,
            setFilters
        }
    }
}