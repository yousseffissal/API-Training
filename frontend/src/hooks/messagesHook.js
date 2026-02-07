import { useState } from 'react';
import axios from 'axios';

// we seprated the logic of fetching and managing messages from the UI components by creating a custom hook called useMessages, this hook encapsulates all the logic related to fetching messages from the backend API, managing the state of the sender input, handling errors, and storing the results, and we can use this hook in any component that needs to interact with the messages API without having to duplicate the logic in each component, this promotes code reusability and separation of concerns in our React application.

// The API_URL is defined in the .env file in the frontend, and it should match the URL where the backend server is running, for example if the backend server is running on http://localhost:3000, then the API_URL should be set to http://localhost:3000 in the .env file, and we can access it in our code using import.meta.env.VITE_API_URL, and this allows us to easily change the backend URL without having to modify our code, we just need to update the .env file with the new URL we use _VITE_ prefix for the environment variable because Vite only exposes environment variables that start with VITE_ to the client-side code for security reasons, so we need to use this prefix to make sure that our API_URL variable is accessible in our frontend code.
const API_URL = import.meta.env.VITE_API_URL

export const messagesHook = () => {
    // State variables to manage sender input, API result, and error messages
    const [sender, setSender] = useState('')
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')
    const [Request, setRequest] = useState('')
    const [post, setPost] = useState('')

    // Function to fetch message data from the backend API based on the sender input
    const fetchMessage = async () => {
        if (!sender.trim()) {
            setError('Please enter a sender name')
            return
        }

        try {
            setError('')
            setResult(null)
            setRequest('FetchMessage') // Set the current request type to FetchMessage

            // Make a GET request to the backend API endpoint to fetch messages for the specified sender, passing query parameters for loggedIn and admin status
            const response = await axios.get(
                `${API_URL}/messages/FindHello/${sender}`,
                // We can pass query parameters in the request to the backend to provide additional information about the request, for example we can pass a parameter called loggedIn to indicate whether the user is logged in or not, and a parameter called admin to indicate whether the user is an admin or not, and we can access these parameters in the backend using req.query.loggedIn and req.query.admin respectively, and we can use these parameters to implement different logic in the backend based on the user's authentication and authorization status, for example we can allow only logged-in users to access certain endpoints, or we can allow only admin users to perform certain actions in the backend. so in this case we are passing loggedIn as true and admin as true as query parameters in the request to the backend.
                {
                    params: {
                        loggedIn: true,
                        admin: true,
                    },
                }
            )

            // If the request is successful, we set the result state with the response data from the backend
            //the axios response is a json object that contains a data property that holds the actual response data from the backend, so we access it using response.data and set it to the result state variable to display it in the frontend to see the other properties of the axios response object, you can log the response object to the console and check its structure, but usually the actual data from the backend is found in the data property of the response object, so we access it using response.data to get the message data that we want to display in the frontend.
            //the response data from the backend will have the following structure : { message: 'Message retrieved successfully.', data: getMessage } , so we can access the message using response.data.message and the actual message data using response.data.data, and we can set the result state variable to response.data to have access to both the message and the data in the frontend, and then we can display them in the UI as needed.
            //it's data{message: 'Message retrieved successfully.', datas: getMessage} not data{message: 'Message retrieved successfully.', data: getMessage} because we changed the name of the data property in the response from the backend to datas in the message.controller.js file, so we need to access it using response.data.datas to get the actual message data from the backend.
            setResult(response.data)

        } catch (err) {
            setError(
                err.response?.data?.error || 'Error while fetching data'
            )
        }
    }

    const deleteMessage = async () => {
        if (!sender.trim()) {
            setError('Please enter a sender name')
            return
        }

        try {
            setError('')
            setResult(null)
            setRequest('DeleteMessage')

            const response = await axios.delete(
                `${API_URL}/messages/DeleteHello/${sender}`,
                // We can pass query parameters in the request to the backend to provide additional information about the request, for example we can pass a parameter called loggedIn to indicate whether the user is logged in or not, and a parameter called admin to indicate whether the user is an admin or not, and we can access these parameters in the backend using req.query.loggedIn and req.query.admin respectively, and we can use these parameters to implement different logic in the backend based on the user's authentication and authorization status, for example we can allow only logged-in users to access certain endpoints, or we can allow only admin users to perform certain actions in the backend. so in this case we are passing loggedIn as true and admin as true as query parameters in the request to the backend.
                {
                    params: {
                        loggedIn: true,
                        admin: true,
                    },
                }
            )

            setResult(response.data)

        } catch (err) {
            setError(
                err.response?.data?.error || 'Error while deleting data'
            )
        }

    }

    const deleteAll = async () => {
        try {
            setError('')
            setResult(null)
            setRequest('DeleteAll')

            const response = await axios.delete(
                `${API_URL}/messages/DeleteAll`,
                // We can pass query parameters in the request to the backend to provide additional information about the request, for example we can pass a parameter called loggedIn to indicate whether the user is logged in or not, and a parameter called admin to indicate whether the user is an admin or not, and we can access these parameters in the backend using req.query.loggedIn and req.query.admin respectively, and we can use these parameters to implement different logic in the backend based on the user's authentication and authorization status, for example we can allow only logged-in users to access certain endpoints, or we can allow only admin users to perform certain actions in the backend. so in this case we are passing loggedIn as true and admin as true as query parameters in the request to the backend.
                {
                    params: {
                        loggedIn: true,
                        admin: true,
                    },
                }
            )

            setResult(response.data)

        } catch (err) {
            setError(
                err.response?.data?.error || 'Error while deleting data'
            )
        }

    }

    const fetchAll = async () => {
        try {
            setError('')
            setResult(null)
            setRequest('FetchAll')

            const response = await axios.get(
                `${API_URL}/messages/FetchALL`,
                // We can pass query parameters in the request to the backend to provide additional information about the request, for example we can pass a parameter called loggedIn to indicate whether the user is logged in or not, and a parameter called admin to indicate whether the user is an admin or not, and we can access these parameters in the backend using req.query.loggedIn and req.query.admin respectively, and we can use these parameters to implement different logic in the backend based on the user's authentication and authorization status, for example we can allow only logged-in users to access certain endpoints, or we can allow only admin users to perform certain actions in the backend. so in this case we are passing loggedIn as true and admin as true as query parameters in the request to the backend.
                {
                    params: {
                        loggedIn: true,
                        admin: true,
                    },
                }
            )

            setResult(response.data)

        } catch (err) {
            setError(
                err.response?.data?.error || 'Error while fetching data'
            )
        }

    }

    const postMessage = async () => {
        try {
            setError('')
            setResult(null)
            setRequest('PostMessage')

            if (!sender.trim()) {
                setError('Please enter a sender name')
                return
            }

            const response = await axios.post(
                `${API_URL}/messages/SayHello/${sender}`,
                {
                    message: post
                },
                {
                    params: {
                        loggedIn: true,
                        admin: true,
                    },
                }
            )


            setResult(response.data)

        } catch (err) {
            setError(
                err.response?.data?.error || 'Error while posting data'
            )
        }

    }

    return {
        sender,
        setSender,
        setPost,
        result,
        error,
        Request,
        fetchMessage,
        deleteMessage,
        deleteAll,
        fetchAll,
        postMessage
    };
};
