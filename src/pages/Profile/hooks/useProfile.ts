import { useState } from "react";

export const useProfile = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editUserProfile, setEditUserProfile] = useState<UserProfileDTO>();
    const [editUserPassword, setEditUserPassword] = useState<UserNewPasswordDTO>();
    const [UserProfile, setUserProfile] = useState<UserProfileDTO>(
        {
            name: "Николаев Николай Николаевич",
            phone: " +7-800-555-35-35",
            password:  "7775"
        }
    );
    const [UserOrders, setUserOrders] = useState<ShortUserOrdersDTO>(
        {
            inProcess: 1,
            completed: 2
        }
    );

    return {
        state: {isOpen, editUserProfile, UserProfile, UserOrders, editUserPassword},
        functions: {
            setIsOpen,
            setEditUserProfile,
            setUserProfile,
            setUserOrders,
            setEditUserPassword
        }
    }
}