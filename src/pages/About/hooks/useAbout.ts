import { useGetAbout } from "@/utils/api/hooks/useGetAbout";
import { useMemo } from "react";

export const useAbout = () => {
    const abouts = useGetAbout();

    const getAboutInfo = useMemo(() => {
        if (!abouts.data) return undefined

        return abouts.data.data;
    }, [abouts.data]);

    return {
        state: { abouts, getAboutInfo }
    }
}