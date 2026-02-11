/**
 * COMMENT MODEL
 * 
 * This defines comments on kolam designs.
 */

import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  // The kolam this comment belongs to
  kolam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kolam',
    required: true
  },
  
  // User who wrote the comment
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Comment text
  text: {
    type: String,
    required: [true, 'Comment text is required'],
    trim: true,
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  
  // Timestamp
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Index for faster queries
commentSchema.index({ kolam: 1, createdAt: -1 })

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
