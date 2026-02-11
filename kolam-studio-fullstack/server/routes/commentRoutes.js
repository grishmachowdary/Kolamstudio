/**
 * COMMENT ROUTES
 */

import express from 'express'
import { getComments, addComment, deleteComment } from '../controllers/commentController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Get comments for a kolam
router.get('/kolam/:kolamId', getComments)

// Add comment (protected)
router.post('/kolam/:kolamId', protect, addComment)

// Delete comment (protected)
router.delete('/:id', protect, deleteComment)

export default router
