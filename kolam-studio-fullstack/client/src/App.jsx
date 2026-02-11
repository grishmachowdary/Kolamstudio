/**
 * MAIN APP COMPONENT
 * 
 * This is the root component of our application.
 * It sets up routing and provides global context.
 * 
 * WHAT IS ROUTING?
 * Routing allows us to show different pages without reloading the browser.
 * Example: /home shows Home page, /generator shows Generator page
 * 
 * REACT ROUTER BASICS:
 * - BrowserRouter: Enables routing in our app
 * - Routes: Container for all route definitions
 * - Route: Maps a URL path to a component
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

// Import page components
import Home from './pages/Home'
import Generator from './pages/Generator'
import Scanner from './pages/Scanner'
import Whiteboard from './pages/Whiteboard'
import Tutorials from './pages/Tutorials'
import Community from './pages/Community'
import Library from './pages/Library'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

// Import layout components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    // AuthProvider wraps the entire app to provide authentication state
    <AuthProvider>
      {/* BrowserRouter enables routing */}
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          {/* Navbar appears on all pages */}
          <Navbar />
          
          {/* Main content area */}
          <main className="flex-grow">
            {/* Routes define which component to show for each URL */}
            <Routes>
              {/* Public routes - anyone can access */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Feature routes */}
              <Route path="/generator" element={<Generator />} />
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/whiteboard" element={<Whiteboard />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/community" element={<Community />} />
              
              {/* Protected routes - require login */}
              <Route path="/library" element={<Library />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          
          {/* Footer appears on all pages */}
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
