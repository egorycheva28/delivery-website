import type {
    DishCategorySchema
} from "@/pages/DishCategory/components/DishCategoryDialog/constants/DishCategorySchema.ts";
import {useDeleteCategoryByIdMutation} from "@/utils/api/hooks/useDeleteCategoryByIdMutation.ts";

export const useDishCategoryCard = (setDishCategory: (dishCategory: DishCategorySchema, id: string) => void, openCancelDelete: () => void) => {
    const deleteDishCategory = useDeleteCategoryByIdMutation()

    const handleEditCategory = (id: string, name: string, description: string) => {
        const dishCategory = {
            name: name,
            description: description
        }
        setDishCategory(dishCategory, id)
    }

    const handleDeleteCategory = async (id: string) => {
        await deleteDishCategory.mutateAsync({ params: { id } },
            {
                onSuccess: () => console.log("Delete" + id),
                onError: (error) => {
                    if (error.response?.status !== 401) openCancelDelete()
                }
            })
    }

    return {
        functions: { handleEditCategory, handleDeleteCategory }
    }
}