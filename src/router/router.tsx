import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import OrderDetails from "../pages/OrderDetails"
import NoTracking from "../pages/NoTracking"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/order-details",
        element: <OrderDetails />
    },
    {
        path: "/no-tracking-details",
        element: <NoTracking />
    },
]);