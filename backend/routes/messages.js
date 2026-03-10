import { Router } from 'express'
import { supabase } from '../config/supabase.js'
import { authenticateAdmin, authenticatePublic } from '../middleware/auth.js'
import { messageSchema, validate } from '../middleware/validation.js'

const router = Router()

// Obtener todos los mensajes (solo admin)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Crear mensaje (público)
router.post('/', authenticatePublic, validate(messageSchema), async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    const { data, error } = await supabase
      .from('messages')
      .insert({ name, email, subject, message })
      .select()
      .single()

    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Eliminar mensaje (admin)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', parseInt(id))

    if (error) throw error
    res.json({ message: 'Message deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
