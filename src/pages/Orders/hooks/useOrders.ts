import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface OrderListFilters {
    statuses?: string[],
    operators?: string[]
}

export const useOrders = () => {
    const [role, setRole] = useState<string>('admin');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isStatus, setIsStatus] = useState<boolean>(false);
    const [isOperator, setIsOperator] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>([
        {
            number: 1,
            date: 'string',
            address: 'string',
            price: 500,
            status: 'string',
            payment: 'наличными'
        },
        {
            number: 2,
            date: 'string',
            address: 'string',
            price: 500,
            status: 'string',
            payment: 'картой'
        },
        {
            number: 3,
            date: 'string',
            address: 'string',
            price: 500,
            status: 'string',
            payment: 'QR-код'
        }
    ])

    const [searchParams, setSearchParams] = useSearchParams();
    const initialFilters = useMemo((): OrderListFilters => {
        const params: OrderListFilters = {};

        const statuses = searchParams.get('statuses');
        if (statuses) params.statuses = statuses.split(',');

        const operators = searchParams.get('operators');
        if (operators) params.operators = operators.split(',');

        return params;
    }, []);

    const [filters, setFilters] = useState<OrderListFilters>(initialFilters);

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

        setSearchParams(params, { replace: true });
    }, [filters])

    return {
        state: { isOpen, orders, role, isStatus, isOperator, filters },
        functions: { setIsOpen, setOrders, setRole, setIsStatus, setIsOperator, setFilters }
    }
};