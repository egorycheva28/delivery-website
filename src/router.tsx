import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./utils/constants/routes";
import Root from "./pages/Root/Root";
import About from "./pages/About/About";
import Menu from "@/pages/Menu/Menu.tsx";
import DishDetail from "@/pages/DishDetail/DishDetail.tsx";
import Basket from "@/pages/Basket/Basket.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import DeliveryAndPayment from "@/pages/DeliveryAndPayment/DeliveryAndPayment.tsx";
import ProfileOrders from "@/pages/ProfileOrders/ProfileOrders.tsx";
import OrderDishes from "@/pages/OrderDishes/OrderDishes.tsx";

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <Root />,
        children: [
            {
                path: ROUTES.ROOT,
                element: <Menu />
            },
            {
                path: ROUTES.DISH_DETAILS,
                element: <DishDetail />
            },
            {
                path: ROUTES.BASKET,
                element: <Basket />
            },
            {
                path: ROUTES.ABOUT,
                element: <About/>
            },
            {
                path: ROUTES.PROFILE,
                element: <Profile/>
            },
            {
                path: ROUTES.DELIVERY_AND_PAYMENT,
                element: <DeliveryAndPayment />
            },
            {
                path: ROUTES.PROFILE_ORDERS,
                element: <ProfileOrders />
            },
            {
                path: ROUTES.ORDER_DISHES,
                element: <OrderDishes />
            }
        ]
    }
])