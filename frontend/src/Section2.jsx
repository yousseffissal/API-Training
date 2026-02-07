import './index.css'
import { messagesHook } from './hooks/messagesHook'

function Section2() {

    // Destructure the state variables and functions from the useMessages hook to manage message data and interactions with the backend API
    const {
        // State variables to manage sender input, API result, and error messages
        post,
        sender,
        setSender,
        setPost,
        result,
        error,
        Request,
        // Functions to interact with the backend API for posting messages
        postMessage,
    } = messagesHook();

    return (
        <div>
            <div className="min-h-fit flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                    <h1 className="mb-4 text-2xl font-semibold text-red-800">
                        Add to Application
                    </h1>

                    <p className="mb-6 text-gray-600">
                        Enter a message to add it to the database.
                    </p>

                    <input
                        type="text"
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        placeholder="Who is sending"
                        className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2"
                    />

                    <textarea
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                        placeholder="Write your message..."
                        rows={4}
                        className="mb-4 w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-900 focus:bg-white focus:outline-non"
                    />

                    <button
                        onClick={postMessage}
                        className=" w-full rounded-lg bg-slate-700 py-2 text-white hover:bg-slate-800"
                    >
                        Post Message
                    </button>


                    {/* Results Area */}
                    <div className="text-sm">
                        {Request === '' && (
                            <p></p>
                        )}

                        {Request === 'PostMessage' && (
                            <>
                                {/* Display error message if there is an error */}
                                {error && <p className="text-red-600 mt-4">{error}</p>}

                                {/* Display post confirmation */}
                                {result && (
                                    <p className="text-green-600 mt-4">
                                        {`Message posted successfully from : ${sender}`}
                                    </p>
                                )}
                            </>
                        )}

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Section2