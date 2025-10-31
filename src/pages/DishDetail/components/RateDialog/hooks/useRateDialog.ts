import {
    rateDialogSchema,
    type RateDialogSchema
} from "@/pages/DishDetail/components/RateDialog/constants/RateDialogSchema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {usePutUpdateRatingMutation} from "@/utils/api/hooks/usePutUpdateRatingMutation.ts";
import {usePostAddRatingMutation} from "@/utils/api/hooks/usePostAddRatingMutation.ts";

export const useRateDialog = (setIsOpen: (isOpen: boolean) => void, dishId: string, reload: () => void, initialData?: RateDialogSchema) => {
    const editRating = usePutUpdateRatingMutation()
    const addRating = usePostAddRatingMutation()

    const rateForm = useForm<RateDialogSchema>({
        resolver: zodResolver(rateDialogSchema),
        defaultValues: {
            rating: initialData?.rating || 2.5
        }
    });

    const handleSliderChange = (newValue: number[]) => {
        rateForm.setValue("rating", newValue[0]);
    };

    const onSubmit = rateForm.handleSubmit(async (value) => {
        if (initialData) {
            await editRating.mutateAsync({ params: { id: dishId, rating: value.rating } })
        } else {
            await addRating.mutateAsync({ params: { id: dishId, rating: value.rating } })
        }

        reload()
        rateForm.reset()
        setIsOpen(false)
    })

    const clampRating = (value: string): number => {
        return Math.min(5, Math.max(1, parseFloat(value)));
    };

    useEffect(() => {
        rateForm.reset({
            rating: initialData?.rating || 3
        });
    }, [initialData]);

    return {
        form: rateForm,
        functions: { onSubmit, handleSliderChange, clampRating }
    }
}