import {
    dishCategorySchema,
    type DishCategorySchema
} from "@/pages/DishCategory/components/DishCategoryDialog/constants/DishCategorySchema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";

export const useDishCategoryDialog = (setIsOpen: (isOpen: boolean) => void, initialData?: DishCategorySchema, categoryId?: string) => {
    const categoryForm = useForm<DishCategorySchema>({
        resolver: zodResolver(dishCategorySchema),
        defaultValues: {
            name: initialData?.name || '',
            description: initialData?.description || ''
        }
    });

    const onSubmit = categoryForm.handleSubmit((value) => {
        console.log(categoryId, value)
        setIsOpen(false)
        categoryForm.reset()
    })

    useEffect(() => {
        categoryForm.reset({
            name: initialData?.name || '',
            description: initialData?.description || ''
        });
    }, [initialData]);

    return {
        form: categoryForm,
        functions: { onSubmit }
    }
}