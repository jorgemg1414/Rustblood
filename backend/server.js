import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'

import galleryRoutes from './routes/gallery.js'
import postsRoutes from './routes/posts.js'
import messagesRoutes from './routes/messages.js'

const app = express()
const PORT = process.env.PORT || 3001

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(helmet())
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))

// Rate limiting simple
const rateLimitMap = new Map()
const RATE_WINDOW = 15 * 60 * 1000
const RATE_MAX = 100

app.use((req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown'
  const now = Date.now()

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [])
  }

  const requests = rateLimitMap.get(ip).filter(t => t > now - RATE_WINDOW)
  rateLimitMap.set(ip, requests)

  if (requests.length >= RATE_MAX) {
    return res.status(429).json({ error: 'Too many requests' })
  }

  requests.push(now)
  next()
})

app.use('/api/gallery', galleryRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/messages', messagesRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`)
})
