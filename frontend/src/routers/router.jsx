//  To create our router
import { createBrowserRouter, } from "react-router-dom";
// Components to use/manipulate for each route
import App from "../App.jsx";
import MainPage from "../Pages/MainPage.jsx";
import AllMessages from "../Pages/AllMessages.jsx";
import ErrorPage from "../Pages/ErrorPage.jsx";
const router = createBrowserRouter([
    {
        // In the root we will mount the App component that has the outlet component
        path: "/",
        element: <App />,
        // The error element will mount when we have an error (The error type proccessing is in the element's logic)
        errorElement: <ErrorPage />,
        children: [
            {
                // In the root the outlet component shows the Main Page
                path: "/",
                element: <MainPage />,
            },
            {
                // In the All Route it will show all the messages in the database (Just for testing)
                path: "/All",
                element: <AllMessages />,
            },
            {
                // In the Add Route it will show this message (Just for testing)
                path: "/Add",
                element: <div>This is a test for the route Add</div>,
            },
            {
                // In the Test Route it will show this message (Just for testing)
                path: "/Test",
                element: <div>This is a test for the route Test</div>,
            },
        ]
    },

]);

export default router;