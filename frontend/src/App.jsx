import React from 'react'
import './index.css'
import axios from 'axios';

function App() {
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
          placeholder="Sender name"
          className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        {/* Results Area */}
        <div className="min-h-[120px] rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-500">
          Message data will appear here
        </div>
      </div>
    </div>
  )
}

export default App
