/**
 * MAIN ENTRY POINT
 * 
 * This is where our React application starts.
 * 
 * WHAT HAPPENS HERE:
 * 1. Import React and ReactDOM
 * 2. Import our main App component
 * 3. Import global CSS styles
 * 4. Mount the App to the DOM
 * 
 * HOW REACT WORKS:
 * - React creates a "virtual DOM" (JavaScript representation of HTML)
 * - When data changes, React updates only what's needed
 * - This makes the app fast and efficient
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Get the root element from index.html
const rootElement = document.getElementById('root')

// Create a React root and render the App component
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* StrictMode helps catch bugs during development */}
    <App />
  </React.StrictMode>
)
