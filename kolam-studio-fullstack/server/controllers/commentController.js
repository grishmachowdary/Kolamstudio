/**
 * COMMENT CONTROLLER
 * 
 * Handles comments on kolam designs
 */

import Comment from '../models/Comment.js'
import Kolam from '../models/Kolam.js'

/**
 * GET COMMENTS FOR A KOLAM
 * GET /api/kolams/:kolamId/comments
 * Public route
 */
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ kolam: req.params.kolamId })
      .populate('user', 'username')
      .sort('-createdAt')
    
    res.status(200).json({
      success: true,
      count: comments.length,
      comments
    })
    
  } catch (error) {
    console.error('Get comments error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message
    })
  }
}

/**
 * ADD COMMENT
 * POST /api/kolams/:kolamId/comments
 * Protected route
 */
export const addComment = async (req, res) => {
  try {
    const { text } = req.body
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Comment text is required'
      })
    }
    
    // Check if kolam exists
    const kolam = await Kolam.findById(req.params.kolamId)
    if (!kolam) {
      return res.status(404).json({
        success: false,
        message: 'Kolam not found'
      })
    }
    
    // Create comment
    const comment = await Comment.create({
      kolam: req.params.kolamId,
      user: req.user._id,
      text
    })
    
    // Populate user info
    await comment.populate('user', 'username')
    
    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment
    })
    
  } catch (error) {
    console.error('Add comment error:', error)
    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message
    })
  }
}

/**
 * DELETE COMMENT
 * DELETE /api/comments/:id
 * Protected route (only owner can delete)
 */
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      })
    }
    
    // Check ownership
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      })
    }
    
    await comment.deleteOne()
    
    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    })
    
  } catch (error) {
    console.error('Delete comment error:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting comment',
      error: error.message
    })
  }
}
