import {useState} from "react";
import {useAuth} from "@/utils/contexts/auth";

export const useHeader = () => {
    const { authenticated, roles, logout } = useAuth()
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenRegister, setIsOpenRegister] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    return {
        state: { isOpenLogin, isOpenRegister, authenticated, roles, isMenuOpen },
        functions: { setIsOpenLogin, setIsOpenRegister, handleLogin, handleRegister, logout, setIsMenuOpen }
    }
}