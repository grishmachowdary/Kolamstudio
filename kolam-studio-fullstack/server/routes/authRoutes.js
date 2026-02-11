/**
 * AUTHENTICATION ROUTES
 * 
 * Routes define the API endpoints.
 * They map URLs to controller functions.
 * 
 * ROUTE STRUCTURE:
 * Method + Path → Controller Function
 * 
 * Example:
 * POST /api/auth/register → register controller
 */

import express from 'express'
import { register, login, getMe, updateProfile } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

// Create router
const router = express.Router()

/**
 * PUBLIC ROUTES
 * Anyone can access these
 */

// Register new user
// POST /api/auth/register
// Body: { username, email, password }
router.post('/register', register)

// Login user
// POST /api/auth/login
// Body: { email, password }
router.post('/login', login)

/**
 * PROTECTED ROUTES
 * Require authentication (JWT token)
 */

// Get current user
// GET /api/auth/me
// Headers: { Authorization: "Bearer <token>" }
router.get('/me', protect, getMe)

// Update user profile
// PUT /api/auth/profile
// Headers: { Authorization: "Bearer <token>" }
// Body: { username, email }
router.put('/profile', protect, updateProfile)

export default router
