/**
 * DATABASE CONFIGURATION
 * 
 * This file handles MongoDB connection.
 * 
 * WHAT IS MONGODB?
 * MongoDB is a NoSQL database that stores data as JSON-like documents.
 * Unlike SQL databases (tables with rows), MongoDB uses collections with documents.
 * 
 * WHY MONGODB?
 * - Flexible schema (easy to change data structure)
 * - Stores JSON naturally (perfect for JavaScript)
 * - Scales easily
 * - Free tier available (MongoDB Atlas)
 * 
 * HOW IT WORKS:
 * 1. Import mongoose (MongoDB library for Node.js)
 * 2. Connect to MongoDB using connection string
 * 3. Handle connection success/failure
 */

import mongoose from 'mongoose'

/**
 * CONNECT TO MONGODB
 * This function establishes connection to the database
 */
const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variables
    const mongoURI = process.env.MONGODB_URI
    
    // Connect to MongoDB
    const conn = await mongoose.connect(mongoURI)
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    console.log(`📊 Database: ${conn.connection.name}`)
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message)
    
    // Exit process with failure
    process.exit(1)
  }
}

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err)
})

export default connectDB
