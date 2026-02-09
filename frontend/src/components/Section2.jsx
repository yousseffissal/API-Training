import '../index.css'
import { messagesHook } from '../hooks/messagesHook'
import { useState } from 'react';

function Section2() {

    // This variable will help us to manage states in the front such as colors and requests type to switch between update and post methods and making them share the same input field (textarea)
    const [change, setChange] = useState("");

    // Destructure the state variables and functions from the useMessages hook to manage message data and interactions with the backend API
    const {
        // State variables to manage sender input, API result, error messages etc...
        loading,
        post,
        update,
        sender,
        error,
        Request,
        successMsg,
        UpdatesuccessMsg,
        setSender,
        setPost,
        setUpdate,
        // Functions to interact with the backend API for posting messages
        postMessage,
        updateMessage
    } = messagesHook();

    return (
        <div className="h-full w-full flex items-center justify-center bg-gray-100">
            <div className="h-full w-full rounded-xl bg-white p-6 shadow-lg">
                <h1 className="mb-4 text-2xl font-semibold text-red-800">
                    Add to Application
                </h1>

                <p className="mb-4 text-gray-600">
                    Enter a message to add or to update in the database.
                </p>

                <div className="flex justify-center items-center mb-4 gap-3">
                    {/* Post */}
                    <label
                        className={`flex-1 cursor-pointer rounded-lg border p-2 text-center transition
                        ${change === "post" ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-300" : "border-gray-300 hover:border-gray-400"}`}
                    >
                        <input
                            type="radio"
                            name="action"
                            value="post"
                            className="hidden"
                            checked={change === "post"}
                            onChange={(e) => setChange(e.target.value)}
                        />
                        <p className="font-semibold">Post</p>
                        <p className="text-xs text-gray-500 mt-1">
                            Send a message!
                        </p>
                    </label>

                    {/* Update */}
                    <label
                        className={`flex-1 cursor-pointer rounded-lg border p-2 text-center transition
                        ${change === "update" ? "border-purple-500 bg-purple-50 text-purple-700 ring-2 ring-purple-300" : "border-gray-300 hover:border-gray-400"}`}
                    >
                        <input
                            type="radio"
                            name="action"
                            value="update"
                            className="hidden"
                            checked={change === "update"}
                            onChange={(e) => setChange(e.target.value)}
                        />
                        <p className="font-semibold">Update</p>
                        <p className="text-xs text-gray-500 mt-1">
                            Update a message!
                        </p>
                    </label>
                </div>


                <input
                    type="text"
                    value={sender}
                    disabled={loading}
                    onChange={(e) => setSender(e.target.value)}
                    placeholder="Who is the sender"
                    className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2"
                />

                <textarea
                    value={change === 'post' ? post : update}
                    onChange={change === 'post' ? (e) => setPost(e.target.value) : (e) => setUpdate(e.target.value)}
                    placeholder={change === '' ? "Hello there! Choose a method to begin..." : (change === 'post' ? "Write your message..." : "Write the updated message...")}
                    rows={4}
                    disabled={loading}
                    className="mb-4 w-full resize-none overflow-auto rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-900 focus:bg-white focus:outline-non"
                />

                <button
                    onClick={change === 'post' ? postMessage : updateMessage}
                    disabled={loading || (change === '')}
                    className={`w-full rounded-lg p-2 text-white mb-5
                    ${loading ? 'bg-gray-400 cursor-not-allowed' : (change === '' ? ' bg-green-700 py-2  hover:bg-green-800' : (change === 'post' ? ' bg-slate-700 py-2  hover:bg-slate-800' : ' bg-purple-700 py-2  hover:bg-purple-800'))}`}
                >
                    {loading ? 'Loading...' : (change === '' ? 'Choose a method' : (change === 'post' ? 'Post Message' : 'Update Message'))}
                </button>

                {/* Results Area */}
                <div className="text-sm mt-auto">
                    {Request === '' && (
                        <p></p>
                    )}

                    {!loading && Request === 'PostMessage' && (
                        <>
                            {/* Display error message if there is an error */}
                            {error && <p className="text-red-600">{error}</p>}

                            {/* Display post confirmation */}
                            {successMsg && (
                                <p className="text-green-600">
                                    {successMsg}
                                </p>
                            )}
                        </>
                    )}

                    {!loading && Request === 'UpdateMessage' && (
                        <>
                            {/* Display error message if there is an error */}
                            {error && <p className="text-red-600">{error}</p>}

                            {/* Display post confirmation */}
                            {UpdatesuccessMsg && (
                                <p className="text-green-600">
                                    {UpdatesuccessMsg}
                                </p>
                            )}
                        </>
                    )}

                </div>

            </div>
        </div >
    )
    
}

export default Section2