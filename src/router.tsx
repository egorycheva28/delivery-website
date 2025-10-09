import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./utils/constants/routes";
import Root from "./pages/Root/Root";
import About from "./pages/About/About";
import Menu from "@/pages/Menu/Menu.tsx";
import DishDetail from "@/pages/DishDetail/DishDetail.tsx";
import Operators from "./pages/Operators/Operators";

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <Root />,
        children: [
            {
                path: ROUTES.ROOT,
                element: <Menu/>
            },
            {
                path: ROUTES.DISH_DETAILS,
                element: <DishDetail/>
            },
            {
                path: ROUTES.OPERATORS,
                element: <Operators />
            },
            {
                path: ROUTES.ABOUT,
                element: <About/>
            }
        ]
    }
])