import {NavLink} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {ROUTES} from "@/utils/constants/routes.ts";
import {useHeader} from "@/pages/Root/components/Header/hooks/useHeader.ts";
import LoginDialog from "@/pages/Root/components/Header/components/LoginDialog/LoginDialog.tsx";
import RegisterDialog from "@/pages/Root/components/Header/components/RegisterDialog/RegisterDialog.tsx";

const Header = () => {
    const { state, functions } = useHeader()

    return (
        <div className="flex justify-between items-center w-full h-[100px] border-b p-12">
            <p className="underline">HITS Delivery service</p>
            <div className="flex items-center gap-12">
                <NavLink to="/">{"Меню"}</NavLink>
                <NavLink to="#deliveryAndPayment">{"Доставка и оплата"}</NavLink>
                <NavLink to={ROUTES.BASKET}>{"Корзина"}</NavLink>
                <NavLink to={ROUTES.ABOUT}>{"О нас"}</NavLink>
                <Button className="cursor-pointer" onClick={() => functions.setIsOpenLogin(true)}>
                    {"Войти"}
                </Button>
            </div>
            <LoginDialog isOpen={state.isOpenLogin} setIsOpen={functions.setIsOpenLogin}
                         register={functions.handleRegister}/>
            <RegisterDialog isOpen={state.isOpenRegister} setIsOpen={functions.setIsOpenRegister}
                            login={functions.handleLogin}/>
        </div>
    )
}

export default Header