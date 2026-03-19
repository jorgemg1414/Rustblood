import { Router } from 'express'
import { supabase } from '../config/supabase.js'
import { authenticateAdmin } from '../middleware/auth.js'
import { postSchema, validate } from '../middleware/validation.js'

const router = Router()

router.get('/', async (req, res) => {
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

router.put('/', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'ID is required' })

    const validation = postSchema.partial().safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message })
    }

    const { data, error } = await supabase
      .from('posts')
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
