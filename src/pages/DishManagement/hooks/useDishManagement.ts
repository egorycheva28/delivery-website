import { useDeleteDishByIdMutation } from "@/utils/api/hooks/useDeleteDishByIdMutation";
import { useGetFoodsWithFiltersQuery } from "@/utils/api/hooks/useGetFoodsWithFiltersQuery";
import { usePatchUpdateAvailabilityDishMutation } from "@/utils/api/hooks/usePatchUpdateAvailabilityDishMutation";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 8;
export const useDishManagement = () => {
    const deleteDish = useDeleteDishByIdMutation()
    const doAvailable = usePatchUpdateAvailabilityDishMutation()
    const dishes = useGetFoodsWithFiltersQuery({
        search: '',
        minPrice: undefined,
        maxPrice: undefined,
        categoryId: '',
        sortBy: '',
        sortDirection: '',
        includeIngredients: []
    })

    const [searchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editDishId, setEditDishId] = useState<string | null>(null)
    const [canselDeleteOpen, setCanselDeleteOpen] = useState(false)
    const [canselAvailableOpen, setCanselAvailableOpen] = useState(false)
    const [newDish, setNewDish] = useState<NewDishDTO>({
        name: '',
        categoryId: '',
        price: 0,
        rate: 0,
        photo: '',
        description: '',
        ingredients: []
    });
    /*const dishes = [
        {
            id: "string1",
            name: "string",
            category: "string",
            description: "Проснись вместе со вкусом лета! Наш фруктовый завтрак — это взрыв свежести и витаминов в первой половине дня. Сочные дольки манго, хрустящие яблоки, спелые ягоды клубники и сладкий виноград — идеально сбалансированное сочетание для лёгкого старта.",
            price: 500,
            rating: 3.5,
            photos: '',
            ingredients: [],
            isAvailable: false
        },
        {
            id: "string2",
            name: "string",
            category: "string",
            description: "string",
            price: 500,
            rating: 3.5,
            photos: '',
            ingredients: [],
            isAvailable: true
        },
        {
            id: "string3",
            name: "string",
            category: "string",
            description: "string",
            price: 500,
            rating: 3.5,
            photos: '',
            ingredients: [],
            isAvailable: true
        },
        {
            id: "string4",
            name: "string",
            category: "string",
            description: "string",
            price: 500,
            rating: 3.5,
            photos: '',
            ingredients: [],
            isAvailable: false
        },
        {
            id: "string5",
            name: "string",
            category: "string",
            description: "string",
            price: 500,
            rating: 3.5,
            photos: '',
            ingredients: [],
            isAvailable: true
        },
        {
            id: "string6",
            name: "string",
            category: "string",
            description: "string",
            price: 500,
            rating: 3.5,
            photos: '',
            ingredients: [],
            isAvailable: true
        },
        {
            id: "string7",
            name: "string",
            category: "string",
            description: "string",
            price: 500,
            rating: 3.5,
            photos: '',
            ingredients: [],
            isAvailable: true
        }
    ]*/

    const displayedData = useMemo(() => {
        if (!dishes.data) return []

        const currentPage = parseInt(searchParams.get('page') || "1", 10) - 1;
        const startItem = ITEMS_PER_PAGE * currentPage;
        return dishes.data.data.slice(startItem, startItem + ITEMS_PER_PAGE) || [];
    }, [dishes.data, searchParams]);

    const handleDeleteDish = async (id: string) => {
        await deleteDish.mutateAsync({ params: { id } },
            {
                onSuccess: () => console.log("Delete" + id),
                onError: (error) => {
                    if (error.response?.status !== 401) setCanselDeleteOpen(true)
                }
            })
    }

    const handleDoAvailable = async (id: string, available: boolean) => {
        await doAvailable.mutateAsync({ params: { id, available } },
            {
                onSuccess: () => console.log("Available" + id + available),
                onError: (error) => {
                    if (error.response?.status !== 401) setCanselAvailableOpen(true)
                }
            })
    }

    return {
        state: { isOpen, dishes, editDishId, newDish, displayedData },
        functions: {
            setIsOpen,
            handleDeleteDish,
            handleDoAvailable,
            setEditDishId,
            setNewDish
        }
    }
}
