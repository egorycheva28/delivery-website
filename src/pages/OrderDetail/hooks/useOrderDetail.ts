import { useGetOrderByIdQuery } from "@/utils/api/hooks/useGetOrderByIdQuery";
import { usePutChangeOperatorMutation } from "@/utils/api/hooks/usePutChangeOperatorForOrderMutation";
import { useAuth } from "@/utils/contexts/auth/useAuth";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const ITEMS_PER_PAGE = 8;
export const useOrderDetail = () => {
    const { id } = useParams<{ id: string }>();
    const order = useGetOrderByIdQuery({ orderId: id || "" })
    //const client = useGetClientByIdQuery({ order.data?.data.id||""})
    const changeOperator = usePutChangeOperatorMutation()

    const { authenticated, roles, userId } = useAuth()
    const [isComment, setIsComment] = useState<boolean>(false);
    const [isChangeOperator, setIsChangeOperator] = useState<boolean>(false);
    const [isAddDish, setIsAddDish] = useState<boolean>(false);
    const [isHistory, setIsHistory] = useState<boolean>(false);
    const [comment, setComment] = useState<NewComment>(
        {
            comment: ''
        }
    );

    const totalPage = useMemo(() => {
        if (!order.data?.data.meals) return 0

        return Math.ceil(order.data.data.meals.length / ITEMS_PER_PAGE);
    }, [order.data?.data.meals]);

    const makeOperator = (async (value: any) => {
        await changeOperator.mutateAsync({
            params: {
                orderId: value.id, operatorId: userId
            }
        })

        order.refetch;
    })

    const deleteDish = () => {
        //логика удаления блюда из заказа
    }

    useEffect(() => {
        //логика получения новой инфы о заказе
    }, [isChangeOperator, isAddDish]);

    return {
        state: { order, isComment, comment, isChangeOperator, isAddDish, isHistory, authenticated, roles, totalPage, id },
        functions: {
            setIsComment,
            setComment,
            makeOperator,
            deleteDish,
            setIsChangeOperator,
            setIsAddDish,
            setIsHistory
        }
    }
}