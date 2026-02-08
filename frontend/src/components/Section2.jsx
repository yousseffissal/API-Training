import '../index.css'
import { messagesHook } from '../hooks/messagesHook'

function Section2() {

    // Destructure the state variables and functions from the useMessages hook to manage message data and interactions with the backend API
    const {
        // State variables to manage sender input, API result, and error messages
        loading,
        post,
        sender,
        successMsg,
        setSender,
        setPost,
        result,
        error,
        Request,
        // Functions to interact with the backend API for posting messages
        postMessage,
    } = messagesHook();

    return (
        <div className="h-full w-full flex items-center justify-center bg-gray-100">
            <div className="h-full w-full rounded-xl bg-white p-6 shadow-lg">
                <h1 className="mb-4 text-2xl font-semibold text-red-800">
                    Add to Application
                </h1>

                <p className="mb-6 text-gray-600">
                    Enter a message to add it to the database.
                </p>

                <input
                    type="text"
                    value={sender}
                    disabled={loading}
                    onChange={(e) => setSender(e.target.value)}
                    placeholder="Who is sending"
                    className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2"
                />

                <textarea
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    placeholder="Write your message..."
                    rows={4}
                    disabled={loading}
                    className="mb-4 w-full resize-none overflow-auto rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-900 focus:bg-white focus:outline-non"
                />

                <button
                    onClick={postMessage}
                    disabled={loading}
                    className={`w-full rounded-lg p-2 text-white mb-5
                    ${loading ? 'bg-gray-400 cursor-not-allowed' : ' bg-slate-700 py-2  hover:bg-slate-800'}`}
                >
                    {loading ? 'Loading...' : 'Post Message'}
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

                </div>

            </div>
        </div >
    )
}

export default Section2