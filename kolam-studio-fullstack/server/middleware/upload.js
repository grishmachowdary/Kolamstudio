/**
 * FILE UPLOAD MIDDLEWARE
 * 
 * Handles image uploads using Multer.
 * 
 * WHAT IS MULTER?
 * Multer is middleware for handling multipart/form-data (file uploads).
 * 
 * HOW IT WORKS:
 * 1. Client sends file in request
 * 2. Multer saves file to disk
 * 3. Multer adds file info to req.file
 * 4. Controller can access file path
 * 
 * FILE STORAGE:
 * Files are saved in /uploads folder with unique names
 */

import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

/**
 * STORAGE CONFIGURATION
 * Defines where and how to save files
 */
const storage = multer.diskStorage({
  // Destination folder
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  
  // Filename format: timestamp-randomnumber-originalname
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

/**
 * FILE FILTER
 * Only allow image files
 */
const fileFilter = (req, file, cb) => {
  // Allowed extensions
  const allowedTypes = /jpeg|jpg|png|gif|webp/
  
  // Check extension
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  
  // Check mime type
  const mimetype = allowedTypes.test(file.mimetype)
  
  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'))
  }
}

/**
 * MULTER CONFIGURATION
 */
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024  // 5MB default
  },
  fileFilter: fileFilter
})
