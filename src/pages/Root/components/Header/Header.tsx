import {NavLink} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

const Header = () => {
    return (
        <div className="flex justify-between items-center w-full h-[100px] border-b p-12">
            <p className="underline">HITS Delivery service</p>
            <div className="flex items-center gap-12">
                <NavLink to="#menu">{"Меню"}</NavLink>
                <NavLink to="#deliveryAndPayment">{"Доставка и оплата"}</NavLink>
                <NavLink to="#basket">{"Корзина"}</NavLink>
                <NavLink to="#about">{"О нас"}</NavLink>
                <Button className="cursor-pointer">{"Войти"}</Button>
            </div>
        </div>
    )
}

export default Header