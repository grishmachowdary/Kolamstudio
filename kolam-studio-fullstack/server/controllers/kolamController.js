/**
 * KOLAM CONTROLLER
 * 
 * Handles all kolam-related operations:
 * - Create, read, update, delete kolams
 * - Like/unlike kolams
 * - Get user's kolams
 * - Filter and search
 */

import Kolam from '../models/Kolam.js'
import User from '../models/User.js'

/**
 * GET ALL KOLAMS
 * GET /api/kolams
 * Public route with optional filters
 */
export const getAllKolams = async (req, res) => {
  try {
    // Extract query parameters for filtering
    const { region, difficulty, occasion, search, sort = '-createdAt', limit = 20, page = 1 } = req.query
    
    // Build query object
    const query = { isPublic: true }
    
    if (region) query.region = region
    if (difficulty) query.difficulty = difficulty
    if (occasion) query.occasion = occasion
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit
    
    // Execute query
    const kolams = await Kolam.find(query)
      .populate('user', 'username')  // Include username
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
    
    // Get total count for pagination
    const total = await Kolam.countDocuments(query)
    
    res.status(200).json({
      success: true,
      count: kolams.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      kolams
    })
    
  } catch (error) {
    console.error('Get all kolams error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching kolams',
      error: error.message
    })
  }
}

/**
 * GET SINGLE KOLAM
 * GET /api/kolams/:id
 * Public route
 */
export const getKolam = async (req, res) => {
  try {
    const kolam = await Kolam.findById(req.params.id)
      .populate('user', 'username points badges')
    
    if (!kolam) {
      return res.status(404).json({
        success: false,
        message: 'Kolam not found'
      })
    }
    
    // Increment view count
    kolam.views += 1
    await kolam.save()
    
    res.status(200).json({
      success: true,
      kolam
    })
    
  } catch (error) {
    console.error('Get kolam error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching kolam',
      error: error.message
    })
  }
}

/**
 * CREATE KOLAM
 * POST /api/kolams
 * Protected route
 */
export const createKolam = async (req, res) => {
  try {
    const {
      title,
      description,
      region,
      difficulty,
      occasion,
      drawingData,
      gridSize,
      symmetry,
      tags,
      isPublic
    } = req.body
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      })
    }
    
    // Create kolam
    const kolam = await Kolam.create({
      title,
      description,
      region,
      difficulty,
      occasion,
      drawingData,
      gridSize,
      symmetry,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      isPublic: isPublic !== undefined ? isPublic : true,
      user: req.user._id,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    })
    
    // Award points to user
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { points: 10 }  // 10 points for creating a kolam
    })
    
    res.status(201).json({
      success: true,
      message: 'Kolam created successfully',
      kolam
    })
    
  } catch (error) {
    console.error('Create kolam error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating kolam',
      error: error.message
    })
  }
}

/**
 * UPDATE KOLAM
 * PUT /api/kolams/:id
 * Protected route (only owner can update)
 */
export const updateKolam = async (req, res) => {
  try {
    const kolam = await Kolam.findById(req.params.id)
    
    if (!kolam) {
      return res.status(404).json({
        success: false,
        message: 'Kolam not found'
      })
    }
    
    // Check ownership
    if (kolam.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this kolam'
      })
    }
    
    // Update fields
    const allowedUpdates = ['title', 'description', 'region', 'difficulty', 'occasion', 'tags', 'isPublic']
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        kolam[field] = req.body[field]
      }
    })
    
    await kolam.save()
    
    res.status(200).json({
      success: true,
      message: 'Kolam updated successfully',
      kolam
    })
    
  } catch (error) {
    console.error('Update kolam error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating kolam',
      error: error.message
    })
  }
}

/**
 * DELETE KOLAM
 * DELETE /api/kolams/:id
 * Protected route (only owner can delete)
 */
export const deleteKolam = async (req, res) => {
  try {
    const kolam = await Kolam.findById(req.params.id)
    
    if (!kolam) {
      return res.status(404).json({
        success: false,
        message: 'Kolam not found'
      })
    }
    
    // Check ownership
    if (kolam.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this kolam'
      })
    }
    
    await kolam.deleteOne()
    
    res.status(200).json({
      success: true,
      message: 'Kolam deleted successfully'
    })
    
  } catch (error) {
    console.error('Delete kolam error:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting kolam',
      error: error.message
    })
  }
}

/**
 * LIKE/UNLIKE KOLAM
 * POST /api/kolams/:id/like
 * Protected route
 */
export const likeKolam = async (req, res) => {
  try {
    const kolam = await Kolam.findById(req.params.id)
    
    if (!kolam) {
      return res.status(404).json({
        success: false,
        message: 'Kolam not found'
      })
    }
    
    // Check if already liked
    const alreadyLiked = kolam.likedBy.includes(req.user._id)
    
    if (alreadyLiked) {
      // Unlike
      kolam.likedBy = kolam.likedBy.filter(
        userId => userId.toString() !== req.user._id.toString()
      )
      kolam.likes -= 1
    } else {
      // Like
      kolam.likedBy.push(req.user._id)
      kolam.likes += 1
    }
    
    await kolam.save()
    
    res.status(200).json({
      success: true,
      message: alreadyLiked ? 'Kolam unliked' : 'Kolam liked',
      likes: kolam.likes,
      isLiked: !alreadyLiked
    })
    
  } catch (error) {
    console.error('Like kolam error:', error)
    res.status(500).json({
      success: false,
      message: 'Error liking kolam',
      error: error.message
    })
  }
}

/**
 * GET USER'S KOLAMS
 * GET /api/kolams/user/:userId
 * Public route
 */
export const getUserKolams = async (req, res) => {
  try {
    const kolams = await Kolam.find({
      user: req.params.userId,
      isPublic: true
    })
      .populate('user', 'username')
      .sort('-createdAt')
    
    res.status(200).json({
      success: true,
      count: kolams.length,
      kolams
    })
    
  } catch (error) {
    console.error('Get user kolams error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching user kolams',
      error: error.message
    })
  }
}

/**
 * GET MY KOLAMS (including private)
 * GET /api/kolams/my
 * Protected route
 */
export const getMyKolams = async (req, res) => {
  try {
    const kolams = await Kolam.find({ user: req.user._id })
      .sort('-createdAt')
    
    res.status(200).json({
      success: true,
      count: kolams.length,
      kolams
    })
    
  } catch (error) {
    console.error('Get my kolams error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching your kolams',
      error: error.message
    })
  }
}
