import { Router } from 'express'
import { supabase } from '../config/supabase.js'
import { authenticateAdmin, authenticatePublic } from '../middleware/auth.js'
import { gallerySchema, validate } from '../middleware/validation.js'

const router = Router()

// Obtener todas las fotos (público)
router.get('/', authenticatePublic, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Agregar foto (admin)
router.post('/', authenticateAdmin, validate(gallerySchema), async (req, res) => {
  try {
    const { title, image_url } = req.body

    const { data, error } = await supabase
      .from('gallery')
      .insert({ title: title || 'Concert', image_url })
      .select()
      .single()

    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Eliminar foto (admin)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', parseInt(id))

    if (error) throw error
    res.json({ message: 'Photo deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
