import React, { useState } from 'react'
import './index.css'
import axios from 'axios'
// The API_URL is defined in the .env file in the frontend, and it should match the URL where the backend server is running, for example if the backend server is running on http://localhost:3000, then the API_URL should be set to http://localhost:3000 in the .env file, and we can access it in our code using import.meta.env.VITE_API_URL, and this allows us to easily change the backend URL without having to modify our code, we just need to update the .env file with the new URL we use _VITE_ prefix for the environment variable because Vite only exposes environment variables that start with VITE_ to the client-side code for security reasons, so we need to use this prefix to make sure that our API_URL variable is accessible in our frontend code.
const API_URL = import.meta.env.VITE_API_URL

function App() {
  // State variables to manage sender input, API result, and error messages
  const [sender, setSender] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  // Function to fetch message data from the backend API based on the sender input
  const fetchMessage = async () => {
    try {
      setError('')
      setResult(null)

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold text-red-800">
          Test Application
        </h1>

        <p className="mb-6 text-gray-600">
          Enter a sender name to view message data.
        </p>

        {/* Sender Input */}
        <input
          type="text"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          placeholder="Sender name"
          className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2"
        />

        <button
          onClick={fetchMessage}
          className="mb-4 w-full rounded-lg bg-red-700 py-2 text-white hover:bg-red-800"
        >
          Fetch Message
        </button>

        {/* Results Area */}
        <div className="min-h-[120px] rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm">

          {// Display error message if there is an error
          error && <p className="text-red-600">{error}</p>}

          {// Display message data if the result is available
          //we used datas instead of data because we changed the name of the data property in the response from the backend to datas in the message.controller.js file, so we need to access it using result.datas to get the actual message data from the backend, and then we can map through it to display each message in the UI.
          result && (
            <div className="space-y-3">
              {result.datas.map((msg) => (
                <div key={msg._id} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">Message:</span>{' '}
                    {msg.message}
                  </p>

                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Sender:</span> {msg.sender}
                  </p>

                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Receiver:</span> {msg.receiver}
                  </p>
                </div>
              ))}
            </div>
          )}

          {// Display a message if the result is available but contains no messages
          result && result.datas.length === 0 && (
            <p className="text-gray-500">No messages found.</p>
          )}

          {// Display a message if there is no result and no error (initial state)
          !result && !error && 'Message data will appear here'}
        </div>
      </div>
    </div>
  )
}

export default App
