import { useState } from "react";
import { useAuth } from "@/utils/contexts/auth";
import { usePutChangeOperatorMutation } from "@/utils/api/hooks/usePutChangeOperatorForOrderMutation.ts";
import { usePutChangeOrderStatusMutation } from "@/utils/api/hooks/usePutChangeOrderStatusMutation.ts";

export const useOrderItem = (reloadOrder: () => void) => {
    const { authenticated, roles, userId } = useAuth()
    const [isComment, setIsComment] = useState<boolean>(false);
    const [isReason, setIsReason] = useState<boolean>(false);

    const changeOperator = usePutChangeOperatorMutation()
    const changeOrderStatus = usePutChangeOrderStatusMutation()

    const appointOperator = (async (id: string) => {
        await changeOperator.mutateAsync({
            params: {
                orderId: id, operatorId: userId
            }
        })

        reloadOrder();
    })

    const changeStatus = (async (id: string, orderId: string) => {
        if (id == 'CANCELED') {
            setIsReason(true);
        }
        else {
            await changeOrderStatus.mutateAsync({
                params: {
                    orderId: orderId, status: id
                }
            })
        }

        reloadOrder();
    })

    return {
        state: { isComment, authenticated, roles, isReason, userId },
        functions: { setIsComment, appointOperator, changeStatus, setIsReason }
    }
}