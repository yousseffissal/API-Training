import { useRouteError, isRouteErrorResponse } from "react-router-dom";
// useRouteError: hook from React Router to get the error object for the current route
// isRouteErrorResponse: helper to check if the error is a route response error (like 404, 500)
// this error page is for the main root (/) cus it's the only one that we have but if we have more we can build new error pages or re-use one in many route.

import errorImage from "../assets/error404.jpg"; 
// Import a custom error illustration image from your assets

function ErrorPage() {
    // Get the error object for the current route
    const error = useRouteError();

    // Default title and message in case the error is not a route error
    let title = "Something went wrong";
    let message = "An unexpected error occurred.";

    // Check if the error is a route response (like 404 or 500)
    if (isRouteErrorResponse(error)) {
        // Set the title dynamically based on HTTP status
        title = `${error.status} ${error.statusText}`;

        // Customize message for 404 Not Found
        if (error.status === 404) {
            message = "The page you are trying to access could not be found. It may have been moved, removed, or is currently unavailable. Please verify the address or navigate back to the homepage.";
        }
    }

    return (
        // Main container that centers content both vertically and horizontally
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100" >
            
            {/* Content wrapper: width and height fit the content, text centered */}
            <div className="flex flex-col text-center text-black px-6 w-fit h-fit justify-center items-center" >
                
                {/* Error illustration image */}
                <img 
                    src={errorImage} 
                    alt="Error illustration" 
                    className="w-full max-w-lg mx-auto object-contain mb-4" 
                    // w-full: image fills container width
                    // max-w-lg: limits image width for large screens
                    // object-contain: maintain aspect ratio without stretching
                    // mb-4: margin below image
                />

                {/* Error title */}
                <h1 className="text-4xl font-bold mb-4 text-center text-red-800">
                    {title}
                </h1>

                {/* Error message text */}
                <p className="mb-10 text-lg opacity-90 text-center max-w-lg">
                    {message}
                </p>

                {/* Small Back Home Button */}
                <a
                    href="/"
                    className="inline-block bg-red-800 text-white rounded-full px-6 py-2 text-sm font-medium border border-red-800 transition-all duration-300 ease-in-out hover:bg-transparent hover:text-red-800 hover:border hover:border-red-800"
                    // inline-block: allows padding and width based on content
                    // bg-black / text-white: default button colors
                    // rounded-full: makes button pill-shaped
                    // px-6 py-2: horizontal and vertical padding
                    // text-sm font-medium: font size and weight
                    // border border-black: adds border
                    // transition-all duration-300 ease-in-out: smooth hover animation
                    // hover:bg-white hover:text-black hover:border-black: changes style on hover
                >
                    Go Back Home
                </a>

            </div>
        </div>
    );
}

export default ErrorPage;
