import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { GetReasonSchema } from "../constants/ReasonShema";

export const useReasonDialog = (isReason: boolean,
    setIsReason: (isReason: boolean) => void, order: Order, reason: Reason,
    setReason: (reason: Reason) => void) => {

    const newReasonForm = useForm<GetReasonSchema>({
        defaultValues: {
            reason: reason.reason || undefined
        }
    })

    const addReason = newReasonForm.handleSubmit(
        (data) => {
            if (data.reason !== undefined) {
                setReason({ reason: data.reason });
            }
            setIsReason(false)
        }
    )

    useEffect(() => {
        if (!isReason) {
            newReasonForm.reset({
                reason: ''
            })
        }
    }, [isReason])

    return {
        state: {},
        form: newReasonForm,
        functions: { addReason }
    }
}