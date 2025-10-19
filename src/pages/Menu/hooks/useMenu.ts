import {useEffect, useMemo, useState} from "react";
import {useDebounceCallback} from "@/utils/hooks/useDebounceCallback/useDebounceCallback.ts";
import {useSearchParams} from "react-router-dom";
import type {GetFoodsWithFilterParams} from "@/utils/api/requests/foods/filter";
import {useGetFoodsWithFiltersQuery} from "@/utils/api/hooks/useGetFoodsWithFiltersQuery.ts";

const SEARCH_TIMEOUT = 500;
export const useMenu = () => {
    /*const dish = [
        {
            id: "string1",
            name: "string",
            category: "string",
            description: "Проснись вместе со вкусом лета! Наш фруктовый завтрак — это взрыв свежести и витаминов в первой половине дня. Сочные дольки манго, хрустящие яблоки, спелые ягоды клубники и сладкий виноград — идеально сбалансированное сочетание для лёгкого старта.",
            price: 500,
            rating: 3.5,
            photos: []
        }
    ]*/

    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const initialFilters = useMemo((): GetFoodsWithFilterParams => {
        const params: GetFoodsWithFilterParams = {};

        const name = searchParams.get('name');
        if (name) params.search = name;

        const dish_category = searchParams.get('category');
        if (dish_category) params.categoryId = dish_category;

        const sorting = searchParams.get('sort');
        if (sorting) params.sortBy = sorting;

        const min_price = searchParams.get('min_price');
        if (min_price) params.minPrice = parseInt(min_price);

        const max_price = searchParams.get('max_price');
        if (max_price) params.maxPrice = parseInt(max_price);

        const ingredients = searchParams.get('ingredients');
        if (ingredients) params.includeIngredients = ingredients.split(',');

        return params;
    }, []);

    const [filters, setFilters] = useState<GetFoodsWithFilterParams>(initialFilters);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (filters.search) {
            params.set('name', filters.search);
        } else {
            params.delete('name');
        }
        if (filters.minPrice) {
            params.set('min_price', filters.minPrice.toString());
        } else {
            params.delete('min_price');
        }
        if (filters.maxPrice) {
            params.set('max_price', filters.maxPrice.toString());
        } else {
            params.delete('max_price');
        }
        if (filters.includeIngredients && filters.includeIngredients.length > 0) {
            params.set('ingredients', filters.includeIngredients.join(','));
        } else {
            params.delete('ingredients');
        }
        if (filters.categoryId) {
            params.set('category', filters.categoryId);
        } else {
            params.delete('category');
        }
        if (filters.sortBy) {
            params.set('sort', filters.sortBy);
        } else {
            params.delete('sort');
        }

        setSearchParams(params, { replace: true });
    }, [filters])

    const handleSelectSorting = (sorting: string) => {
        setFilters((prev: GetFoodsWithFilterParams) => ({
            ...prev,
            sortBy: sorting === "without" ? undefined : sorting
        }));
    }

    const handleSelectCategory = (dish_category: string) => {
        setFilters((prev: GetFoodsWithFilterParams) => ({
            ...prev,
            categoryId: dish_category === "all" ? undefined : dish_category
        }));
    }

    const debouncedSearchByName = useDebounceCallback((name: string) => {
        setFilters({ ...filters, search: name });
    }, SEARCH_TIMEOUT);

    const dishes = useGetFoodsWithFiltersQuery({
        search: filters.search,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        categoryId: filters.categoryId,
        sortBy: filters.sortBy,
        includeIngredients: filters.includeIngredients
    })

    return {
        state: { isOpen, filters, dishes },
        functions: {
            debouncedSearchByName,
            handleSelectCategory,
            handleSelectSorting,
            setIsOpen,
            setFilters
        }
    }
}