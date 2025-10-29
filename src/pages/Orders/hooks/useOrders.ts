import { useGetMyOrdersQuery } from "@/utils/api/hooks/useGetMyOrdersQuery";
import { useGetOrdersWithFiltersQuery } from "@/utils/api/hooks/useGetOrdersWithFiltersQuery";
import { useGetOrdersWithoutOperatorQuery } from "@/utils/api/hooks/useGetOrdersWithoutOperatorQuery";
import { usePutChangeOperatorMutation } from "@/utils/api/hooks/usePutChangeOperatorForOrderMutation";
import { usePutChangeOrderStatusMutation } from "@/utils/api/hooks/usePutChangeOrderStatusMutation";
import { useAuth } from "@/utils/contexts/auth/useAuth";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface OrderListFilters {
    statuses?: string[],
    operators?: string[],
    amOperator: boolean
}

export const useOrders = () => {
    const changeOperator = usePutChangeOperatorMutation()
    const ordersWithoutOperator = useGetOrdersWithoutOperatorQuery({
        page: 1,
        size: 8,
        sort: []
    })
    const changeOrderStatus = usePutChangeOrderStatusMutation()
    const [myId, setMyId] = useState<string>('');

    const myOrders = useGetMyOrdersQuery({
        operatorId: myId,
        page: 1,
        size: 8,
        sort: []
    })

    const { authenticated, roles } = useAuth()
    //const [role, setRole] = useState<string>('admin');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isStatus, setIsStatus] = useState<boolean>(false);
    const [isOperator, setIsOperator] = useState<boolean>(false);
    const [isComment, setIsComment] = useState<boolean>(false);
    const [isReason, setIsReason] = useState<boolean>(false);
    const [comment, setComment] = useState<NewComment>(
        {
            comment: ''
        }
    );
    const [reason, setReason] = useState<Reason>(
        {
            reason: ''
        }
    );

    const appointOperator = (async (value: any) => {
        await changeOperator.mutateAsync({
            params: {
                orderId: value.id, operatorId: myId
            }
        })

        // reloadOComments()
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

        ordersWithoutOperator.refetch;//заменить
        setIsStatus(false);
    })

    const [searchParams, setSearchParams] = useSearchParams();
    const initialFilters = useMemo((): OrderListFilters => {
        const params: OrderListFilters = {
            amOperator: false
        };

        const statuses = searchParams.get('statuses');
        if (statuses) params.statuses = statuses.split(',');

        const operators = searchParams.get('operators');
        if (operators) params.operators = operators.split(',');

        const amOperator = searchParams.get('amOperator');
        if (amOperator) params.amOperator = amOperator === 'true';

        return params;
    }, []);

    const [filters, setFilters] = useState<OrderListFilters>(initialFilters);
    const ordersWithFilters = useGetOrdersWithFiltersQuery({
        operatorName: filters.operators,
        status: filters.statuses,
        page: 1,
        size: 8,
        sort: []
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (filters.statuses && filters.statuses.length > 0) {
            params.set('statuses', filters.statuses.join(','));
        } else {
            params.delete('statuses');
        }
        if (filters.operators && filters.operators.length > 0) {
            params.set('operators', filters.operators.join(','));
        } else {
            params.delete('operators');
        }
        if (authenticated && roles.includes('ADMIN')) {
            params.delete('amOperator');
        } else if (filters.amOperator === true) {
            params.set('amOperator', 'true');

        } else {
            params.set('amOperator', 'false');
        }

        setSearchParams(params, { replace: true });
    }, [filters])

    return {
        state: {
            isOpen, isStatus, isOperator, filters, myOrders,
            isComment, comment, ordersWithoutOperator, authenticated, roles, isReason, reason, ordersWithFilters
        },
        functions: {
            setIsOpen, setIsStatus, setIsOperator, setFilters,
            appointOperator, setIsComment, setComment, changeStatus, setIsReason, setReason
        }
    }
};