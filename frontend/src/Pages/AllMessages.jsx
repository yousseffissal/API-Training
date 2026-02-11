import { useEffect } from 'react';
import { messagesHook } from '../hooks/messagesHook';

// This component automatically fetches all messages when it mounts using the custom hook that we made and then displays them in a styled list while handling possible errors, it's just for testing cus we already  did that in the main page.
function AllMessages() {

    const {
        result,
        error,
        fetchAll
    } = messagesHook();

    // This use effect helps us to make the funtion fetchAll from our hook execute one time when this component mount on the screen to fetch all the messages from the DB and stores them in the statevariables result & error(if there is an error).
    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">

                {/* Error */}
                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {/* Result */}
                {result && (
                    <>
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                All Messages
                            </h2>
                            <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-medium">
                                {result.data.length} Message{result.data.length !== 1 && "s"}
                            </span>
                        </div>

                        {/* Messages List */}
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {result.data.map((msg) => (
                                <div
                                    key={msg._id}
                                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition duration-200 bg-gray-50"
                                >
                                    <p className="text-gray-800 text-sm mb-2 whitespace-pre-wrap break-words">
                                        {msg.message}
                                    </p>

                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>
                                            <span className="font-semibold text-gray-600">From:</span>{" "}
                                            {msg.sender}
                                        </span>
                                        <span>
                                            <span className="font-semibold text-gray-600">To:</span>{" "}
                                            {msg.receiver}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default AllMessages