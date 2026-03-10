import { z } from 'zod'

// Schema para validación de galería
export const gallerySchema = z.object({
  title: z.string().optional().transform(val => val?.trim()),
  image_url: z.string().url('Invalid image URL')
})

// Schema para validación de posts
export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long').trim(),
  content: z.string().min(1, 'Content is required').max(5000, 'Content too long').trim(),
  image_url: z.string().url('Invalid image URL').optional()
})

// Schema para validación de mensajes
export const messageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long').trim(),
  email: z.string().email('Invalid email address').max(100, 'Email too long'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long').trim(),
  message: z.string().min(1, 'Message is required').max(2000, 'Message too long').trim()
})

// Middleware de validación
export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body)
    next()
  } catch (error) {
    const errors = error.errors?.map(e => e.message) || ['Validation failed']
    return res.status(400).json({ error: errors.join(', ') })
  }
}
