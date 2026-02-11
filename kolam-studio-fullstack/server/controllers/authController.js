/**
 * AUTHENTICATION CONTROLLER
 * 
 * Controllers contain the business logic for routes.
 * This controller handles user registration, login, and profile.
 * 
 * CONTROLLER PATTERN:
 * Route → Controller → Model → Database
 * 
 * WHY SEPARATE CONTROLLERS?
 * - Keeps routes clean
 * - Reusable logic
 * - Easier to test
 * - Better organization
 */

import User from '../models/User.js'
import { generateToken } from '../utils/jwt.js'

/**
 * REGISTER NEW USER
 * POST /api/auth/register
 * Public route
 */
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username, email, and password'
      })
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      })
    }
    
    // Create new user
    const user = await User.create({
      username,
      email,
      password  // Will be hashed by pre-save middleware
    })
    
    // Generate JWT token
    const token = generateToken(user._id)
    
    // Send response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        points: user.points,
        badges: user.badges
      }
    })
    
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    })
  }
}

/**
 * LOGIN USER
 * POST /api/auth/login
 * Public route
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
    }
    
    // Find user (include password for comparison)
    const user = await User.findOne({ email }).select('+password')
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }
    
    // Check password
    const isPasswordCorrect = await user.comparePassword(password)
    
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }
    
    // Generate token
    const token = generateToken(user._id)
    
    // Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        points: user.points,
        badges: user.badges
      }
    })
    
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    })
  }
}

/**
 * GET CURRENT USER
 * GET /api/auth/me
 * Protected route (requires authentication)
 */
export const getMe = async (req, res) => {
  try {
    // req.user is set by protect middleware
    const user = req.user
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        points: user.points,
        badges: user.badges,
        createdAt: user.createdAt
      }
    })
    
  } catch (error) {
    console.error('Get me error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
      error: error.message
    })
  }
}

/**
 * UPDATE USER PROFILE
 * PUT /api/auth/profile
 * Protected route
 */
export const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body
    
    // Find and update user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username, email },
      { new: true, runValidators: true }
    ).select('-password')
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    })
    
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    })
  }
}
