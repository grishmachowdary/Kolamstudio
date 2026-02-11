import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import authRoutes from './routes/authRoutes.js'
import kolamRoutes from './routes/kolamRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(` `)
    next()
  })
}

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Kolam Studio API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/kolams', kolamRoutes)
app.use('/api/comments', commentRoutes)
app.use('/uploads', express.static('uploads'))

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
