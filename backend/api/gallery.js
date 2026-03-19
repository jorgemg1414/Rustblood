import { createHandler, requireAdmin, supabase } from './handler.js'
import { gallerySchema } from './validation.js'

export default createHandler({
  async GET(req, res) {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return res.status(200).json(data)
  },

  async POST(req, res) {
    await requireAdmin(req)

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
  },

  async PUT(req, res) {
    await requireAdmin(req)

    const { id } = req.query
    if (!id) {
      return res.status(400).json({ error: 'ID is required' })
    }

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
    return res.status(200).json(data)
  },

  async DELETE(req, res) {
    await requireAdmin(req)

    const { id } = req.query
    if (!id) {
      return res.status(400).json({ error: 'ID is required' })
    }

    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', parseInt(id))

    if (error) throw error
    return res.status(200).json({ message: 'Photo deleted successfully' })
  }
})
