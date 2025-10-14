import type {
    DishCategorySchema
} from "@/pages/DishCategory/components/DishCategoryDialog/constants/DishCategorySchema.ts";

export const useDishCategoryCard = (setDishCategory: (dishCategory: DishCategorySchema, id: string) => void, relatedDishes: string[], openCancelDelete: () => void) => {
    const handleEditCategory = (id: string, name: string, description: string) => {
        const dishCategory = {
            name: name,
            description: description
        }
        setDishCategory(dishCategory, id)
    }

    const handleDeleteCategory = (id: string) => {
        if (relatedDishes.length > 0) {
            openCancelDelete()
        } else {
            console.log("Delete" + id)
        }
    }

    return {
        functions: { handleEditCategory, handleDeleteCategory }
    }
}