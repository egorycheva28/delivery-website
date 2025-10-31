import { useGetProfile } from "@/utils/api/hooks/useGetProfile";
import { useState } from "react";

export const useProfile = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const userProfile = useGetProfile()
    const [UserOrders, setUserOrders] = useState<ShortUserOrdersDTO>(
        {
            inProcess: 1,
            completed: 2
        }
    );

    return {
        state: {isOpen, userProfile, UserOrders},
        functions: {
            setIsOpen,
            setUserOrders            
        }
    }
}