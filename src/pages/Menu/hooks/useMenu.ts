import {useEffect, useMemo, useState} from "react";
import {useDebounceCallback} from "@/utils/hooks/useDebounceCallback/useDebounceCallback.ts";
import {useSearchParams} from "react-router-dom";

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

    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const initialFilters = useMemo((): DishListFilters => {
        const params: DishListFilters = {};

        const name = searchParams.get('name');
        if (name) params.name = name;

        const dish_category = searchParams.get('category');
        if (dish_category) params.dish_category = dish_category;

        const sorting = searchParams.get('sort');
        if (sorting) params.sorting = sorting;

        const min_price = searchParams.get('min_price');
        if (min_price) params.min_price = parseInt(min_price);

        const max_price = searchParams.get('max_price');
        if (max_price) params.max_price = parseInt(max_price);

        const ingredients = searchParams.get('ingredients');
        if (ingredients) params.ingredients = ingredients.split(',');

        return params;
    }, []);

    const [filters, setFilters] = useState<DishListFilters>(initialFilters);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (filters.name) {
            params.set('name', filters.name);
        } else {
            params.delete('name');
        }
        if (filters.min_price) {
            params.set('min_price', filters.min_price.toString());
        } else {
            params.delete('min_price');
        }
        if (filters.max_price) {
            params.set('max_price', filters.max_price.toString());
        } else {
            params.delete('max_price');
        }
        if (filters.ingredients && filters.ingredients.length > 0) {
            params.set('ingredients', filters.ingredients.join(','));
        } else {
            params.delete('ingredients');
        }
        if (filters.dish_category) {
            params.set('category', filters.dish_category);
        } else {
            params.delete('category');
        }
        if (filters.sorting) {
            params.set('sort', filters.sorting);
        } else {
            params.delete('sort');
        }

        setSearchParams(params, { replace: true });
    }, [filters])

    const handleSelectSorting = (sorting: string) => {
        setFilters(prev => ({
            ...prev,
            sorting: sorting === "without" ? undefined : sorting
        }));
    }

    const handleSelectCategory = (dish_category: string) => {
        setFilters(prev => ({
            ...prev,
            dish_category: dish_category === "all" ? undefined : dish_category
        }));
    }

    const debouncedSearchByName = useDebounceCallback((name: string) => {
        setFilters({ ...filters, name });
    }, SEARCH_TIMEOUT);

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