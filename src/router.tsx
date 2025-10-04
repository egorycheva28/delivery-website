import {createBrowserRouter} from "react-router-dom";
import {ROUTES} from "./utils/constants/routes";
import Root from "./pages/Root/Root";
import Menu from "@/pages/Menu/Menu.tsx";

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <Root/>,
        children: [
            {
                path: ROUTES.ROOT,
                element: <Menu/>
            }
        ]
    }
])