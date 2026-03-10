import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'

import galleryRoutes from './routes/gallery.js'
import postsRoutes from './routes/posts.js'
import messagesRoutes from './routes/messages.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware de seguridad
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'https://rustblood-web.vercel.app'],
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))

// Rutas de API
app.use('/api/gallery', galleryRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/messages', messagesRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Ruta no encontrada
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
