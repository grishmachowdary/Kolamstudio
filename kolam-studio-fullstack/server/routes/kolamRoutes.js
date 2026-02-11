/**
 * KOLAM ROUTES
 */

import express from 'express'
import {
  getAllKolams,
  getKolam,
  createKolam,
  updateKolam,
  deleteKolam,
  likeKolam,
  getUserKolams,
  getMyKolams
} from '../controllers/kolamController.js'
import { protect } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'

const router = express.Router()

// Public routes
router.get('/', getAllKolams)
router.get('/user/:userId', getUserKolams)
router.get('/:id', getKolam)

// Protected routes
router.post('/', protect, upload.single('image'), createKolam)
router.put('/:id', protect, updateKolam)
router.delete('/:id', protect, deleteKolam)
router.post('/:id/like', protect, likeKolam)
router.get('/my/kolams', protect, getMyKolams)

export default router
