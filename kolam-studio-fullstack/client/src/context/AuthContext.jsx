/**
 * AUTHENTICATION CONTEXT
 * 
 * This provides user authentication state to the entire app.
 * 
 * WHAT IS CONTEXT?
 * Context is React's way to share data across components without passing props.
 * Think of it as a "global state" that any component can access.
 * 
 * WHY DO WE NEED THIS?
 * - Store logged-in user information
 * - Check if user is authenticated
 * - Provide login/logout functions
 * - Share this data with all components
 * 
 * HOW IT WORKS:
 * 1. User logs in → We get JWT token from backend
 * 2. Store token in localStorage (browser storage)
 * 3. Store user info in Context state
 * 4. Any component can access user info via useAuth hook
 */

import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

// Create the context
const AuthContext = createContext()

// Custom hook to use auth context
// This makes it easy to access auth state in any component
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// AuthProvider component wraps the app
export const AuthProvider = ({ children }) => {
  // State to store current user
  const [user, setUser] = useState(null)
  
  // State to track if we're checking authentication
  const [loading, setLoading] = useState(true)
  
  // State to store JWT token
  const [token, setToken] = useState(localStorage.getItem('token'))
  
  /**
   * CHECK IF USER IS LOGGED IN
   * Runs when app first loads
   */
  useEffect(() => {
    const checkAuth = async () => {
      // If we have a token, verify it with backend
      if (token) {
        try {
          // Set token in axios headers for all requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // Call backend to get user info
          const response = await axios.get('/api/auth/me')
          
          // Store user data in state
          setUser(response.data)
        } catch (error) {
          // Token is invalid, remove it
          console.error('Auth check failed:', error)
          localStorage.removeItem('token')
          setToken(null)
          setUser(null)
        }
      }
      
      setLoading(false)
    }
    
    checkAuth()
  }, [token])
  
  /**
   * LOGIN FUNCTION
   * Called when user submits login form
   */
  const login = async (email, password) => {
    try {
      // Send login request to backend
      const response = await axios.post('/api/auth/login', {
        email,
        password
      })
      
      // Backend returns: { token, user }
      const { token: newToken, user: userData } = response.data
      
      // Store token in localStorage (persists across page reloads)
      localStorage.setItem('token', newToken)
      
      // Update state
      setToken(newToken)
      setUser(userData)
      
      // Set token for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      }
    }
  }
  
  /**
   * REGISTER FUNCTION
   * Called when user submits registration form
   */
  const register = async (username, email, password) => {
    try {
      // Send registration request to backend
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password
      })
      
      // Backend returns: { token, user }
      const { token: newToken, user: userData } = response.data
      
      // Store token and update state (same as login)
      localStorage.setItem('token', newToken)
      setToken(newToken)
      setUser(userData)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      }
    }
  }
  
  /**
   * LOGOUT FUNCTION
   * Called when user clicks logout
   */
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token')
    
    // Clear state
    setToken(null)
    setUser(null)
    
    // Remove token from axios headers
    delete axios.defaults.headers.common['Authorization']
  }
  
  // Value object contains all auth-related data and functions
  const value = {
    user,           // Current user object (null if not logged in)
    token,          // JWT token
    loading,        // Is auth check in progress?
    login,          // Function to log in
    register,       // Function to register
    logout,         // Function to log out
    isAuthenticated: !!user  // Boolean: is user logged in?
  }
  
  // Provide the value to all child components
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
