import React from 'react'

const Loading = () => {
  return (
    <div id="loading-screen" className="w-full h-full opacity-75 z-50">
      <div className="flex h-full w-full items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-blue-400"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-blue-400"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-blue-400"></div>
      </div>
    </div>
  )
}
export default Loading;