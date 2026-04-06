import { z } from 'zod'

// Solo aceptamos URLs de imagen dentro del proyecto Supabase configurado,
// así un admin comprometido no puede inyectar URLs externas. Si por algún
// motivo no tenemos SUPABASE_URL en el entorno, caemos a una validación
// laxa de URL para no romper las rutas — en Vercel siempre debería estar.
const SUPABASE_URL = process.env.SUPABASE_URL || ''
const STORAGE_PREFIX = SUPABASE_URL ? `${SUPABASE_URL}/storage/v1/object/public/` : ''

const imageUrlSchema = z
  .string()
  .url('Invalid image URL')
  .max(500, 'Image URL too long')
  .refine(
    (url) => !STORAGE_PREFIX || url.startsWith(STORAGE_PREFIX),
    'Image URL must come from Supabase Storage'
  )

export const gallerySchema = z.object({
  title: z
    .string()
    .max(100, 'Title too long')
    .optional()
    .transform((val) => val?.trim()),
  image_url: imageUrlSchema
})

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long').trim(),
  content: z.string().min(1, 'Content is required').max(5000, 'Content too long').trim(),
  image_url: imageUrlSchema.optional()
})

export const messageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long').trim(),
  email: z.string().email('Invalid email address').max(100, 'Email too long'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long').trim(),
  message: z.string().min(1, 'Message is required').max(2000, 'Message too long').trim()
})
