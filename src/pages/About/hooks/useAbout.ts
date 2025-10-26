import { useState } from "react";
import {useAuth} from "@/utils/contexts/auth";

export const useAbout = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editAbout, setEditAbout] = useState<EditAboutDTO>();
    const { authenticated, roles } = useAuth()
    const [abouts, setAbouts] = useState<EditAboutDTO>(
        {
            name: "HITs Delivery service",
            phoneOperator: "89999999999",
            phoneManager: "89999999888",
            email: "string@mail.com",
            address: "string",
            information: "Доставим быстро и качественно!"
        }
    );

    return {
        state: { isOpen, editAbout, roles, authenticated, abouts },
        functions: {
            setIsOpen,
            setEditAbout,
            setAbouts
        }
    }
}