import { Router } from 'express'
import { supabase } from '../config/supabase.js'
import { authenticateAdmin } from '../middleware/auth.js'
import { gallerySchema, validate } from '../middleware/validation.js'

const router = Router()

router.get('/', async (req, res) => {
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

router.put('/', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'ID is required' })

    const validation = gallerySchema.partial().safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message })
    }

    const { data, error } = await supabase
      .from('gallery')
      .update(validation.data)
      .eq('id', parseInt(id))
      .select()
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'ID is required' })

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
