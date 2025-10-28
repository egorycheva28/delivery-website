import { useGetOrderByIdQuery } from "@/utils/api/hooks/useGetOrderByIdQuery";
import { useAuth } from "@/utils/contexts/auth/useAuth";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const ITEMS_PER_PAGE = 8;
export const useOrderDetail = () => {
    const { id } = useParams<{ id: string }>();
    const order = useGetOrderByIdQuery({ orderId: id || "" })
    //const client = useGetClientByIdQuery({ order.data?.data.id||""})
    //const changeOperator = usePutChangeOperatorMutation()

    const { authenticated, roles } = useAuth()
    // const [role, setRole] = useState<string>('admin');
    const [isComment, setIsComment] = useState<boolean>(false);
    const [isChangeOperator, setIsChangeOperator] = useState<boolean>(false);
    const [isAddDish, setIsAddDish] = useState<boolean>(false);
    const [isHistory, setIsHistory] = useState<boolean>(false);
    const [comment, setComment] = useState<NewComment>(
        {
            comment: ''
        }
    );

    /*const [order] = useState<Order>({
        id: id || '',
        clientId: '',
        address: 'string',
        phoneNumber: 'string',
        comment: 'string',
        price: 500,
        declineReason: 'string',
        operatorId: 'string',
        status: OrderStatus.NEW,
        payWay: OrderPayWay.CARD,
        meals: [{
            id: 'string',
            name: 'string',
            price: 600
        },
        {
            id: 'string',
            name: 'string',
            price: 500
        }]
    });*/

    //добавить client, это удалить потом
    const user = {
        name: 'Фамилия Имя Отчество',
        phone: '+79999999999'
    }

    const totalPage = useMemo(() => {
        if (!order.data?.data.meals) return 0

        return Math.ceil(order.data.data.meals.length / ITEMS_PER_PAGE);
    }, [order.data?.data.meals]);

    const makeOperator = () => {
        //логика назначения себя оператором
    }

    /*    const appointOperator = (async (value: any) => {
            await changeOperator.mutateAsync({
                params: {
                    orderId: value.id, operatorId: myId
                }
            })
    
            // reloadOComments()
        }) */

    const deleteDish = () => {
        //логика удаления блюда из заказа
    }

    const changeOperator = () => {
        //логика смены оператора
    }

    useEffect(() => {
        //логика получения новой инфы о заказе
    }, [isChangeOperator, isAddDish]);

    return {
        state: { order, isComment, comment, user, isChangeOperator, isAddDish, isHistory, authenticated, roles, totalPage, id },
        functions: {
            setIsComment,
            setComment,
            makeOperator,
            deleteDish,
            changeOperator,
            setIsChangeOperator,
            setIsAddDish,
            setIsHistory
        }
    }
}