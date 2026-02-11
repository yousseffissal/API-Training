//  To create our router
import { createBrowserRouter, } from "react-router-dom";
// Components to use/manipulate for each route
import App from "../App.jsx";
import MainPage from "../Pages/MainPage.jsx";

const router = createBrowserRouter([
    {
        // In the root we will mount the App component that has the outlet component
        path: "/",
        element: <App />,
        children: [
            {
                // In the root the outlet component shows the Main Page
                path: "/",
                element: <MainPage />,
            },
            {
                // In the Add Route it will show this message (Just for testing)
                path: "/Add",
                element: <div>Test for the route Add</div>,
            },
            {
                // In the Test Route it will show this message (Just for testing)
                path: "/Test",
                element: <div>Test for the route Test</div>,
            },
        ]
    },

]);

export default router;