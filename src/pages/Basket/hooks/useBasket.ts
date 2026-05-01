import {useMemo, useRef, useState} from "react";
import {useGetCartQuery} from "@/utils/api/hooks/useGetCartQuery.ts";
import {useDeleteAllDishIntoCartMutation} from "@/utils/api/hooks/useDeleteAllDishIntoCartMutation.ts";
import {TOTAL_COST_NOT_UPDATE} from "@/utils/constants/envBugs.ts";

export const useBasket = () => {
    const cart = useGetCartQuery({ basketId: localStorage.getItem('basketId')! })
    const deleteAllDishIntoCart = useDeleteAllDishIntoCartMutation()

    const firstPriceRef = useRef<number | null>(null);
    const shouldPreservePriceRef = useRef(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteAll = async () => {
        await deleteAllDishIntoCart.mutateAsync({}, {
            onSuccess: () => {
                cart.refetch()
            }
        })
    }

    const handleSuccessBasketDesign = () => {
        cart.refetch().then(() => {
            setIsOpen(true);
        });
    }

    const totalPrice = useMemo(() => {
        const currentPrice = cart.data?.data.total;

        if (currentPrice) {
            if (!shouldPreservePriceRef.current) {
                firstPriceRef.current = currentPrice;
            }
        }

        if (TOTAL_COST_NOT_UPDATE && firstPriceRef.current) {
            shouldPreservePriceRef.current = true;
            return firstPriceRef.current;
        }

        shouldPreservePriceRef.current = false;
        return currentPrice;
    }, [cart.data]);

    const sortedItem = useMemo(() => {
        return cart.data?.data.items
            ? [...cart.data.data.items].sort((a, b) => a.name.localeCompare(b.name))
            : [];
    }, [cart.data]);

    return {
        state: { sortedItem, isOpen, totalPrice },
        functions: { handleDeleteAll, setIsOpen, handleSuccessBasketDesign, refetch: cart.refetch }
    }
}