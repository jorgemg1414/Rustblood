import { createClient } from '@supabase/supabase-js'
import { gallerySchema } from './validation.js'
import { authenticateAdmin } from './middleware/auth.js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  const allowedOrigins = ['https://rustblood-web.vercel.app', 'http://localhost:5173']
  const origin = req.headers.origin
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return res.status(200).json(data)
    }

    if (req.method === 'POST') {
      try {
        await authenticateAdmin(req)
      } catch (authError) {
        if (authError.message === 'No token provided') {
          return res.status(401).json({ error: 'No token provided' })
        } else if (authError.message === 'Invalid token') {
          return res.status(401).json({ error: 'Invalid token' })
        } else {
          return res.status(403).json({ error: authError.message })
        }
      }
      
      // Validar entrada
      const validation = gallerySchema.safeParse(req.body)
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors[0].message })
      }

      const { title, image_url } = validation.data

      const { data, error } = await supabase
        .from('gallery')
        .insert({ title: title || 'Concert', image_url })
        .select()
        .single()

      if (error) throw error
      return res.status(201).json(data)
    }

    if (req.method === 'DELETE') {
      try {
        await authenticateAdmin(req)
      } catch (authError) {
        if (authError.message === 'No token provided') {
          return res.status(401).json({ error: 'No token provided' })
        } else if (authError.message === 'Invalid token') {
          return res.status(401).json({ error: 'Invalid token' })
        } else {
          return res.status(403).json({ error: authError.message })
        }
      }

      const { id } = req.query

      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', parseInt(id))

      if (error) throw error
      return res.status(200).json({ message: 'Photo deleted successfully' })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Error:', error)
    // No exponer detalles del error al cliente
    return res.status(500).json({ error: 'Internal server error' })
  }
}
