import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./utils/constants/routes";
import Root from "./pages/Root/Root";
import Operators from "./pages/Operators/Operators";

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <Root />,
        children: [
            {
                path: ROUTES.OPERATORS,
                element: <Operators />
            }
        ]
    }
])