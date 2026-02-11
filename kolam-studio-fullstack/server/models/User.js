/**
 * USER MODEL
 * 
 * This defines the structure of User data in MongoDB.
 * 
 * WHAT IS A MODEL?
 * A model is like a blueprint for data. It defines:
 * - What fields exist (username, email, password)
 * - What type each field is (String, Number, Date)
 * - Validation rules (required, unique, min length)
 * 
 * MONGOOSE SCHEMA:
 * Schema = Structure definition
 * Model = Actual database interface
 */

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// Define the User schema
const userSchema = new mongoose.Schema({
  // Username field
  username: {
    type: String,           // Data type
    required: [true, 'Username is required'],  // Validation
    unique: true,           // Must be unique
    trim: true,             // Remove whitespace
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  
  // Email field
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,        // Convert to lowercase
    trim: true,
    match: [              // Regex validation for email format
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  
  // Password field (will be hashed)
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false         // Don't return password in queries by default
  },
  
  // User points (for gamification)
  points: {
    type: Number,
    default: 0
  },
  
  // Achievement badges
  badges: [{
    name: String,
    earnedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Account creation date
  createdAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * MIDDLEWARE: HASH PASSWORD BEFORE SAVING
 * 
 * This runs automatically before saving a user to database.
 * It encrypts the password so we never store plain text passwords.
 * 
 * WHY HASH PASSWORDS?
 * - Security: If database is hacked, passwords are encrypted
 * - One-way: Can't reverse the hash to get original password
 * - Bcrypt: Industry-standard hashing algorithm
 */
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next()
  }
  
  // Generate salt (random data added to password)
  const salt = await bcrypt.genSalt(10)
  
  // Hash the password with salt
  this.password = await bcrypt.hash(this.password, salt)
  
  next()
})

/**
 * METHOD: COMPARE PASSWORD
 * 
 * This method checks if entered password matches hashed password.
 * Used during login.
 * 
 * HOW IT WORKS:
 * 1. User enters password: "mypassword123"
 * 2. We hash it the same way
 * 3. Compare with stored hash
 * 4. Return true if match, false if not
 */
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Create and export the User model
const User = mongoose.model('User', userSchema)

export default User
