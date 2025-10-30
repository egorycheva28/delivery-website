import {useEffect, useMemo, useState} from "react";
import {useDebounceCallback} from "@/utils/hooks/useDebounceCallback/useDebounceCallback.ts";
import {useSearchParams} from "react-router-dom";
import type {GetFoodsWithFilterParams} from "@/utils/api/requests/foods/filter";
import {useGetFoodsWithFiltersQuery} from "@/utils/api/hooks/useGetFoodsWithFiltersQuery.ts";
import {getSortingForRequest} from "@/pages/Menu/helpers/getSortingForRequest.ts";
import {getSortingForUrl} from "@/pages/Menu/helpers/getSortingForUrl.ts";
import {useGetCategoriesQuery} from "@/utils/api/hooks/useGetCategoriesQuery.ts";
import {useGetCartQuery} from "@/utils/api/hooks/useGetCartQuery.ts";

const SEARCH_TIMEOUT = 500;
const ITEMS_PER_PAGE = 8;
export const useMenu = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [goToStart, setGoToStart] = useState(false);

    const initialFilters = useMemo((): GetFoodsWithFilterParams => {
        const params: GetFoodsWithFilterParams = {};

        const name = searchParams.get('name');
        if (name) params.search = name;

        const dish_category = searchParams.get('category');
        if (dish_category) params.categoryId = dish_category;

        const sorting = searchParams.get('sort');
        if (sorting) {
            const [sortBy, sortDirection] = getSortingForRequest(sorting)
            params.sortBy = sortBy;
            params.sortDirection = sortDirection;
        }

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
        if (filters.sortBy && filters.sortDirection) {
            params.set('sort', getSortingForUrl(filters.sortBy, filters.sortDirection));
        } else {
            params.delete('sort');
        }

        setSearchParams(params, { replace: true });
        setGoToStart(prev => !prev)
    }, [filters])

    const handleSelectSorting = (sorting: string) => {
        const [sortBy, sortDirection] = getSortingForRequest(sorting)
        setFilters((prev: GetFoodsWithFilterParams) => ({
            ...prev,
            sortBy: sorting === "without" ? undefined : sortBy,
            sortDirection: sorting === "without" ? undefined : sortDirection,
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

    const categories = useGetCategoriesQuery();
    const cart = useGetCartQuery({ basketId: localStorage.getItem('basketId')! })
    const dishes = useGetFoodsWithFiltersQuery({
        search: filters.search,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        categoryId: filters.categoryId,
        sortBy: filters.sortBy,
        sortDirection: filters.sortDirection,
        includeIngredients: filters.includeIngredients
    })

    const displayedData = useMemo(() => {
        if (!dishes.data) return []

        const currentPage = parseInt(searchParams.get('page') || "1", 10) - 1;
        const startItem = ITEMS_PER_PAGE * currentPage;

        return dishes.data.data.map((itemData) => {
            const dishItem = cart.data?.data.items.find(item => item.dishId !== itemData.id)

            return {
                dishId: itemData.id!,
                name: itemData.name!,
                price: itemData.price!,
                quantity: dishItem?.quantity || 0,
                photo: itemData.photo!,
                rate: itemData.rate!,
                description: itemData.description!,
                categoryId: itemData.categoryId!,
                isAvailable: itemData.isAvailable!,
            };
        }).slice(startItem, startItem + ITEMS_PER_PAGE) || [];
    }, [dishes.data, searchParams]);

    const totalPage = useMemo(() => {
        if (!dishes.data) return 0

        return Math.ceil(dishes.data.data.length / ITEMS_PER_PAGE);
    }, [dishes.data]);

    return {
        state: { isOpen, filters, categories, totalPage, displayedData, goToStart },
        functions: {
            debouncedSearchByName,
            handleSelectCategory,
            handleSelectSorting,
            setIsOpen,
            setFilters
        }
    }
}