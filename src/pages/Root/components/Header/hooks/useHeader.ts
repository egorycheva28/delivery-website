import {useEffect, useState} from "react";
import {useAuth} from "@/utils/contexts/auth";
import {useGetAbout} from "@/utils/api/hooks/useGetAbout.ts";

export const useHeader = () => {
    const { authenticated, logout } = useAuth()
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenRegister, setIsOpenRegister] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const abouts = useGetAbout();

    const handleLogin = () => {
        setIsOpenRegister(false)
        setTimeout(() => {
            setIsOpenLogin(true);
        }, 300);
    }

    const handleRegister = () => {
        setIsOpenLogin(false)
        setTimeout(() => {
            setIsOpenRegister(true);
        }, 300);
    }

    const generateBasketId = (): string => {
        return crypto.randomUUID();
    };

    useEffect(() => {
        let existingBasketId = localStorage.getItem('basketId');

        if (!existingBasketId) {
            existingBasketId = generateBasketId();
            localStorage.setItem('basketId', existingBasketId);
        }
    }, []);

    return {
        state: { isOpenLogin, isOpenRegister, authenticated, isMenuOpen, abouts },
        functions: { setIsOpenLogin, setIsOpenRegister, handleLogin, handleRegister, logout, setIsMenuOpen }
    }
}