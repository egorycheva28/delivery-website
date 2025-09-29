import {createBrowserRouter} from "react-router-dom";
import {ROUTES} from "./utils/constants/routes";
import Root from "./pages/Root/Root";

export const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <Root/>,
        children: []
    }
])