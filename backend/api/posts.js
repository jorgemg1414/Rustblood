import { createHandler, requireAdmin, supabase } from './handler.js'
import { postSchema } from './validation.js'

export default createHandler({
  async GET(req, res) {
    const { id } = req.query

    if (id) {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', parseInt(id))
        .single()

      if (error) throw error
      return res.status(200).json(data)
    }

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return res.status(200).json(data)
  },

  async POST(req, res) {
    await requireAdmin(req)

    const validation = postSchema.safeParse(req.body)
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message })
    }

    const { title, content, image_url } = validation.data

    const insertData = { title, content }
    if (image_url) insertData.image_url = image_url

    const { data, error } = await supabase
      .from('posts')
      .insert(insertData)
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
    return res.status(200).json(data)
  },

  async DELETE(req, res) {
    await requireAdmin(req)

    const { id } = req.query
    if (!id) {
      return res.status(400).json({ error: 'ID is required' })
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', parseInt(id))

    if (error) throw error
    return res.status(200).json({ message: 'Post deleted successfully' })
  }
})
