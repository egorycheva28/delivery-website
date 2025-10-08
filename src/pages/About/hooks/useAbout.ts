import { useState } from "react";

export const useAbout = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editAbout, setEditAbout] = useState<EditAboutDTO>();
    const [role] = useState<string>("admin");
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
        state: { isOpen, editAbout, role, abouts },
        functions: {
            setIsOpen,
            setEditAbout,
            setAbouts
        }
    }
}