/**
 * AUTHENTICATION MIDDLEWARE
 * 
 * Middleware is code that runs BEFORE your route handler.
 * This middleware checks if user is authenticated.
 * 
 * HOW IT WORKS:
 * 1. Extract token from request header
 * 2. Verify token is valid
 * 3. Get user from database
 * 4. Attach user to request object
 * 5. Continue to next middleware/route
 * 
 * USAGE:
 * app.get('/api/protected', protect, (req, res) => {
 *   // req.user is available here
 * })
 */

import { verifyToken } from '../utils/jwt.js'
import User from '../models/User.js'

/**
 * PROTECT MIDDLEWARE
 * Ensures user is logged in before accessing route
 */
export const protect = async (req, res, next) => {
  try {
    // Get token from header
    // Format: "Authorization: Bearer <token>"
    let token
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1]
    }
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Please login.'
      })
    }
    
    // Verify token
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      })
    }
    
    // Get user from database (exclude password)
    const user = await User.findById(decoded.userId).select('-password')
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    
    // Attach user to request object
    // Now any route handler can access req.user
    req.user = user
    
    // Continue to next middleware/route
    next()
    
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    })
  }
}

/**
 * OPTIONAL AUTH MIDDLEWARE
 * Attaches user if token exists, but doesn't require it
 * Useful for routes that work for both logged-in and guest users
 */
export const optionalAuth = async (req, res, next) => {
  try {
    let token
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    
    if (token) {
      const decoded = verifyToken(token)
      if (decoded) {
        const user = await User.findById(decoded.userId).select('-password')
        if (user) {
          req.user = user
        }
      }
    }
    
    next()
  } catch (error) {
    // Don't fail, just continue without user
    next()
  }
}
