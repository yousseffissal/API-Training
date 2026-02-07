import './index.css'
import { messagesHook } from './hooks/messagesHook'

function Section1() {

  // Destructure the state variables and functions from the useMessages hook to manage message data and interactions with the backend API
  const {
    // State variables to manage sender input, API result, and error messages
    sender,
    setSender,
    result,
    error,
    Request,
    // Functions to interact with the backend API for fetching, deleting, and managing messages
    fetchMessage,
    deleteMessage,
    deleteAll,
    fetchAll
  } = messagesHook();

  return (

    <div className="min-h-fit flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold text-red-800">
          Test Application
        </h1>

        <p className="mb-6 text-gray-600">
          Enter a sender name to view, delete his messages data.
        </p>

        {/* Sender Input */}
        <input
          type="text"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          placeholder="Sender name"
          className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2"
        />

        <div className='gap-3 justify-between items-center mb-4 flex'>
          <button
            onClick={fetchMessage}
            className="w-full rounded-lg bg-yellow-700 py-2 text-white hover:bg-yellow-800"
          >
            Fetch Message
          </button>

          <button
            onClick={deleteMessage}
            className="w-full rounded-lg bg-orange-700 py-2 text-white hover:bg-orange-800"
          >
            Delete Message
          </button>

          <button
            onClick={fetchAll}
            className="w-full rounded-lg bg-green-700 py-2 text-white hover:bg-green-800"
          >
            Fetch All
          </button>

        </div>
        <button
          onClick={deleteAll}
          className="w-full rounded-lg bg-red-700 py-2 text-white hover:bg-red-800 mb-5"
        >
          Delete All Messages
        </button>


        {/* Results Area */}

        <div className="min-h-[120px] rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm">
          {Request === '' && (
            <p className="text-gray-500 mb-4">Results will appear here</p>
          )}

          {Request === 'FetchMessage' && (
            <>
              {/* Display error message if there is an error */}
              {error && <p className="text-red-600 mb-4">{error}</p>}

              {/* Display message data if the result is available */}
              {result && result.datas && result.datas.length > 0 && (
                <div className="space-y-3">
                  {result.datas.map((msg) => (
                    <div
                      key={msg._id}
                      className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
                    >
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">
                          Message:
                        </span>{' '}
                        {msg.message}
                      </p>

                      <p className="text-xs text-gray-500">
                        <span className="font-semibold">Sender:</span>{' '}
                        {msg.sender}
                      </p>

                      <p className="text-xs text-gray-500">
                        <span className="font-semibold">Receiver:</span>{' '}
                        {msg.receiver}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* No messages */}
              {result && result.datas && result.datas.length === 0 && (
                <p className="text-gray-500 mb-4">No messages found.</p>
              )}

            </>
          )}

          {Request === 'DeleteMessage' && (
            <>
              {/* Display error message if there is an error */}
              {error && <p className="text-red-600 mb-4">{error}</p>}

              {/* Display delete confirmation */}
              {result && (
                <p className="text-green-600 mb-4">
                  {result.message || 'Message deleted successfully.'}
                </p>
              )}

            </>
          )}

          {Request === 'FetchAll' && (
            <>
              {/* Display error message if there is an error */}
              {error && <p className="text-red-600 mb-4">{error}</p>}

              {/* Display delete confirmation */}
              {result && (
                <div className="space-y-3">
                  {result.data.map((msg) => (
                    <div
                      key={msg._id}
                      className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
                    >
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">
                          Message:
                        </span>{' '}
                        {msg.message}
                      </p>

                      <p className="text-xs text-gray-500">
                        <span className="font-semibold">Sender:</span>{' '}
                        {msg.sender}
                      </p>

                      <p className="text-xs text-gray-500">
                        <span className="font-semibold">Receiver:</span>{' '}
                        {msg.receiver}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </>
          )}

          {Request === 'DeleteAll' && (
            <>
              {/* Display error message if there is an error */}
              {error && <p className="text-red-600 mb-4">{error}</p>}

              {/* Display delete confirmation */}
              {result && (
                <p className="text-green-600 mb-4">
                  {result.message || 'All messages deleted successfully.'}
                </p>
              )}

            </>
          )}
        </div>

      </div>
    </div>)
}

export default Section1
