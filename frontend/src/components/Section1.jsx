import '../index.css'
import { messagesHook } from '../hooks/messagesHook'

function Section1() {

  //Note : The loading state comes from messagesHook and represents whether an API request is currently in progress. When loading is true, all inputs and buttons are disabled to prevent multiple requests, button text changes to “Loading…”, and a spinner is displayed in the results area. Once the request finishes (success or error), loading becomes false, the loader disappears, and the corresponding result or error is shown.
  // sender: stores the sender name entered by the user and is used in API requests.
  // result: contains the successful response data returned from the backend.
  // error: holds the error message when a request fails.
  // Request: identifies the last action performed to control which UI content is displayed.

  const {
    loading,
    sender,
    setSender,
    result,
    error,
    Request,
    // Functions to interact with the backend API for posting messages
    fetchMessage,
    deleteMessage,
    deleteAll,
    fetchAll
  } = messagesHook();

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <div className="h-full w-full rounded-xl bg-white p-6 shadow-lg">

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
          disabled={loading}
        />

        {/* Buttons */}
        <div className="gap-3 justify-between items-center mb-4 flex flex-col custom:flex-row">
          <button
            onClick={fetchMessage}
            disabled={loading}
            className={`w-full rounded-lg p-2 text-white
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-700 hover:bg-yellow-800'}`}
          >
            {loading ? 'Loading...' : 'Fetch Message'}
          </button>

          <button
            onClick={deleteMessage}
            disabled={loading}
            className={`w-full rounded-lg p-2 text-white
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-700 hover:bg-orange-800'}`}
          >
            {loading ? 'Loading...' : 'Delete Message'}
          </button>

          <button
            onClick={fetchAll}
            disabled={loading}
            className={`w-full rounded-lg p-2 text-white
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'}`}
          >
            {loading ? 'Loading...' : 'Fetch All'}
          </button>
        </div>

        <button
          onClick={deleteAll}
          disabled={loading}
          className={`w-full rounded-lg p-2 text-white mb-5
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-700 hover:bg-red-800'}`}
        >
          {loading ? 'Loading...' : 'Delete All Messages'}
        </button>

        {/* Results Area */}
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm ">

          {/* Loader */}
          {loading && (
            <div className="flex items-center justify-center py-6">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            </div>
          )}

          {/* Default text */}
          {!loading && Request === '' && (
            <p className="text-gray-500 mb-4">Results will appear here</p>
          )}

          {/* Fetch Message */}
          {!loading && Request === 'FetchMessage' && (
            <>
              {error && <p className="text-red-600 mb-4">{error}</p>}

              {result?.datas?.length > 0 && (
                <>
                  {result?.datas?.length === 1 ? <p className="text-green-600 mb-4">This sender has : {result.datas.length} message</p> : <p className="text-green-600 mb-4">This sender has : {result.datas.length} messages</p>}

                  <div className="space-y-3 overflow-y-scroll h-40 ">
                    {result.datas.map(msg => (
                      <div
                        key={msg._id}
                        className="w-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
                      >
                        <p className="text-sm text-gray-700 break-words whitespace-pre-wrap max-w-80">
                          <span className="font-semibold">Message:</span> {msg.message}
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
                </>
              )}

            </>
          )}

          {/* Delete Message */}
          {!loading && Request === 'DeleteMessage' && (
            <>
              {error && <p className="text-red-600 mb-4">{error}</p>}
              {result && <p className="text-green-600">{result.message}</p>}
            </>
          )}

          {/* Fetch All */}
          {!loading && Request === 'FetchAll' && (
            <>
              {error && <p className="text-red-600 mb-4">{error}</p>}

              {result && (
                <>
                  {result?.data?.length === 1 ? <p className="text-green-600 mb-4">There is : {result.data.length} message in the DB</p> : <p className="text-green-600 mb-4">There are : {result.data.length} messages in the DB</p>}

                  <div className="space-y-3 overflow-y-scroll h-40">
                    {result.data.map(msg => (
                      <div
                        key={msg._id}
                        className="w-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm "
                      >
                        <p className="text-sm text-gray-700 break-words whitespace-pre-wrap max-w-80">
                          <span className="font-semibold">Message:</span> {msg.message}
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
                </>
              )}
            </>
          )}

          {/* Delete All */}
          {!loading && Request === 'DeleteAll' && (
            <>
              {error && <p className="text-red-600 mb-4">{error}</p>}
              {result && <p className="text-green-600">{result.message}</p>}
            </>
          )}
        </div>

      </div>
    </div>
  )
  
}

export default Section1
