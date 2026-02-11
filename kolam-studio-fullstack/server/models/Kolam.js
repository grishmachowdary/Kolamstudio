/**
 * KOLAM MODEL
 * 
 * This defines the structure of Kolam designs in MongoDB.
 * Each kolam has metadata, image, and drawing data.
 */

import mongoose from 'mongoose'

const kolamSchema = new mongoose.Schema({
  // Title of the kolam
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  
  // User who created this kolam
  user: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to User model
    ref: 'User',                           // Name of the model to reference
    required: true
  },
  
  // Regional style
  region: {
    type: String,
    enum: ['Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Mixed'],
    default: 'Tamil'
  },
  
  // Difficulty level
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  
  // Occasion/Festival
  occasion: {
    type: String,
    enum: ['Daily', 'Diwali', 'Pongal', 'Onam', 'Wedding', 'Festival', 'Other'],
    default: 'Daily'
  },
  
  // Description
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  
  // Image URL (stored file path)
  imageUrl: {
    type: String
  },
  
  // Drawing data (JSON format)
  // This stores the actual drawing strokes for playback
  drawingData: {
    type: mongoose.Schema.Types.Mixed,  // Can store any JSON structure
    default: {}
  },
  
  // Pattern metadata
  gridSize: {
    type: Number,
    min: 5,
    max: 15,
    default: 7
  },
  
  symmetry: {
    type: String,
    enum: ['none', 'vertical', 'horizontal', 'both', 'radial-4', 'radial-8'],
    default: 'none'
  },
  
  // Social features
  likes: {
    type: Number,
    default: 0
  },
  
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  views: {
    type: Number,
    default: 0
  },
  
  // Tags for search
  tags: [String],
  
  // Visibility
  isPublic: {
    type: Boolean,
    default: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Update the updatedAt timestamp before saving
kolamSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

// Create indexes for faster queries
kolamSchema.index({ user: 1, createdAt: -1 })  // User's kolams sorted by date
kolamSchema.index({ region: 1, difficulty: 1 }) // Filter by region and difficulty
kolamSchema.index({ occasion: 1 })              // Filter by occasion
kolamSchema.index({ likes: -1 })                // Sort by popularity

const Kolam = mongoose.model('Kolam', kolamSchema)

export default Kolam
