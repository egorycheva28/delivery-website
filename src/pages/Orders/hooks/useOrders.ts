import { useMemo, useState } from "react";

export const useOrders = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
    const [role, setRole] = useState<string>('admin');
    //const initialFilters = useMemo(():);
    //const [filters, setFilters] = useState<>(initialFilters);


    return {
        state: { isOpen, orders, role },
        functions: { setIsOpen, setOrders, setRole }
    }
};