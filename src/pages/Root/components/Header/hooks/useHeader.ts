import {useState} from "react";

export const useHeader = () => {
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenRegister, setIsOpenRegister] = useState(false);

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
        state: { isOpenLogin, isOpenRegister },
        functions: { setIsOpenLogin, setIsOpenRegister, handleLogin, handleRegister }
    }
}