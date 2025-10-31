import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./utils/constants/routes";
import Root from "./pages/Root/Root";
import About from "./pages/About/About";
import Menu from "@/pages/Menu/Menu.tsx";
import DishDetail from "@/pages/DishDetail/DishDetail.tsx";
import Operators from "./pages/Operators/Operators";
import DishManagement from "./pages/DishManagement/DishManagement";
import Basket from "@/pages/Basket/Basket.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import Orders from "./pages/Orders/Orders";
import Statistics from "@/pages/Statistics/Statistics.tsx";
import DishCategory from "@/pages/DishCategory/DishCategory.tsx";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
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
                path: ROUTES.OPERATORS,
                element: <Operators />
            },
            {
                path: ROUTES.DISH_MANAGEMENT,
                element: <DishManagement />
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
                path: ROUTES.ORDERS,
                element: <Orders />
            },
            {
                path: ROUTES.STATISTICS,
                element: <Statistics />
            },
            {
                path: ROUTES.DISH_CATEGORY,
                element: <DishCategory />
            },
            {
                path: ROUTES.ORDER_DETAILS,
                element: <OrderDetail />
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