/**
 * JWT UTILITIES
 * 
 * JWT (JSON Web Token) is used for authentication.
 * 
 * HOW JWT WORKS:
 * 1. User logs in with email/password
 * 2. Server verifies credentials
 * 3. Server creates JWT token with user ID
 * 4. Token is sent to frontend
 * 5. Frontend stores token (localStorage)
 * 6. Frontend sends token with every request
 * 7. Server verifies token to identify user
 * 
 * JWT STRUCTURE:
 * header.payload.signature
 * 
 * Example:
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIn0.signature
 * 
 * WHY JWT?
 * - Stateless: Server doesn't need to store sessions
 * - Secure: Signed with secret key
 * - Portable: Works across different domains
 */

import jwt from 'jsonwebtoken'

/**
 * GENERATE JWT TOKEN
 * Creates a token with user ID
 */
export const generateToken = (userId) => {
  // Create token with payload (user ID)
  const token = jwt.sign(
    { userId },                    // Payload: data to encode
    process.env.JWT_SECRET,        // Secret key (from .env)
    { expiresIn: process.env.JWT_EXPIRE }  // Expiration time
  )
  
  return token
}

/**
 * VERIFY JWT TOKEN
 * Checks if token is valid and returns decoded data
 */
export const verifyToken = (token) => {
  try {
    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (error) {
    return null
  }
}
