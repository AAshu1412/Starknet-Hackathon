import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <header className="text-center">
          <h1 className="text-4xl font-bold">Welcome to My Website</h1>
          <p className="mt-4 text-lg">This is an example page with a black background and white text.</p>
        </header>
        <main className="mt-8">
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            Click Me
          </button>
        </main>
        <footer className="mt-auto py-4 text-center text-sm text-gray-400">
          &copy; 2025 My Website. All rights reserved.
        </footer>
      </div>
    )
}

export default App
