import { useGetAbout } from "@/utils/api/hooks/useGetAbout";
import { useMemo, useState } from "react";
import type { EditAboutSchema } from "../components/EditAboutDialog/constants/EditAboutShema";

export const useAbout = () => {
    const abouts = useGetAbout();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editAbout, setEditAbout] = useState<About>();
    const [role] = useState<string>("admin");
    const [aboutData, setAboutData] = useState<EditAboutSchema | undefined>(undefined);
    /*const [abouts, setAbouts] = useState<About>(
        {
            name: "HITs Delivery service",
            phoneOperator: "89999999999",
            phoneManager: "89999999888",
            email: "string@mail.com",
            address: "string"
            //information: "Доставим быстро и качественно!"
        }
    );*/

    const openEditAbout = () => {
        setAboutData(undefined);
        setIsOpen(true);
    }

    const getAboutInfo = useMemo(() => {
        if (!abouts.data) return undefined

        return abouts.data.data;
    }, [abouts.data]);

    return {
        state: { isOpen, editAbout, role, abouts, getAboutInfo, aboutData },
        functions: {
            setIsOpen,
            setEditAbout,
            openEditAbout
        }
    }
}