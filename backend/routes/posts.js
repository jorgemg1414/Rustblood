import { Router } from 'express'
import { supabase } from '../config/supabase.js'
import { authenticateAdmin, authenticatePublic } from '../middleware/auth.js'
import { postSchema, validate } from '../middleware/validation.js'

const router = Router()

// Obtener todos los posts (público)
router.get('/', authenticatePublic, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Obtener un post específico (público)
router.get('/:id', authenticatePublic, async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', parseInt(id))
      .single()

    if (error) throw error
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Crear post (admin)
router.post('/', authenticateAdmin, validate(postSchema), async (req, res) => {
  try {
    const { title, content, image_url } = req.body

    const insertData = { title, content }
    if (image_url) insertData.image_url = image_url

    const { data, error } = await supabase
      .from('posts')
      .insert(insertData)
      .select()
      .single()

    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Eliminar post (admin)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', parseInt(id))

    if (error) throw error
    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
