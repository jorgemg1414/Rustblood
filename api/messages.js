import { createClient } from '@supabase/supabase-js'
import { messageSchema } from './validation.js'

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
      // Solo para admin
      const authHeader = req.headers.authorization
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' })
      }

      const token = authHeader.split(' ')[1]
      const { data: { user }, error: authError } = await supabase.auth.getUser(token)
      
      if (authError || !user) {
        return res.status(401).json({ error: 'Invalid token' })
      }

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return res.status(200).json(data)
    }

    if (req.method === 'POST') {
      // Validar entrada
      const validation = messageSchema.safeParse(req.body)
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors[0].message })
      }

      const { name, email, subject, message } = validation.data

      const { data, error } = await supabase
        .from('messages')
        .insert({ name, email, subject, message })
        .select()
        .single()

      if (error) throw error
      return res.status(201).json(data)
    }

    if (req.method === 'DELETE') {
      // Validar autenticación
      const authHeader = req.headers.authorization
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' })
      }

      const token = authHeader.split(' ')[1]
      const { data: { user }, error: authError } = await supabase.auth.getUser(token)
      
      if (authError || !user) {
        return res.status(401).json({ error: 'Invalid token' })
      }

      const { id } = req.query

      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', parseInt(id))

      if (error) throw error
      return res.status(200).json({ message: 'Message deleted successfully' })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Error:', error)
    // No exponer detalles del error al cliente
    return res.status(500).json({ error: 'Internal server error' })
  }
}
