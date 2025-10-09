import {NavLink} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {ROUTES} from "@/utils/constants/routes.ts";

const Header = () => {
    return (
        <div className="flex justify-between items-center w-full h-[100px] border-b p-12">
            <p className="underline">HITS Delivery service</p>
            <div className="flex items-center gap-12">
                <NavLink to="/">{"Меню"}</NavLink>
                <NavLink to="#deliveryAndPayment">{"Доставка и оплата"}</NavLink>
                <NavLink to="#basket">{"Корзина"}</NavLink>
                <NavLink to={ROUTES.ABOUT}>{"О нас"}</NavLink>
                <Button className="cursor-pointer">{"Войти"}</Button>
            </div>
        </div>
    )
}

export default Header