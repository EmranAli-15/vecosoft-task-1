import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import OrderDetails from "../pages/OrderDetails"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/order-details",
        element: <OrderDetails />
    },
]);