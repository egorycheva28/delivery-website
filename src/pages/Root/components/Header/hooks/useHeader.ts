import {useEffect, useState} from "react";
import {useAuth} from "@/utils/contexts/auth";
import {useGetProfile} from "@/utils/api/hooks/useGetProfile.ts";

export const useHeader = () => {
    const { authenticated, roles, logout } = useAuth()
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenRegister, setIsOpenRegister] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const userProfile = useGetProfile()

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
        state: { isOpenLogin, isOpenRegister, authenticated, roles, isMenuOpen, userProfile },
        functions: { setIsOpenLogin, setIsOpenRegister, handleLogin, handleRegister, logout, setIsMenuOpen }
    }
}