import { createHandler, requireAdmin, requireRateLimit, rateLimit, supabase } from './handler.js'
import { messageSchema } from './validation.js'

// Rate limit estricto para el formulario de contacto: 5 envíos por IP cada hora.
const contactLimiter = rateLimit({
  scope: 'contact',
  max: 5,
  windowSeconds: 60 * 60
})

export default createHandler({
  async GET(req, res) {
    await requireAdmin(req)

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return res.status(200).json(data)
  },

  async POST(req, res) {
    await requireRateLimit(req, contactLimiter)

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

    if (error) {
      console.error('[messages.POST] insert failed:', error)
      throw error
    }
    return res.status(201).json(data)
  },

  async DELETE(req, res) {
    await requireAdmin(req)

    const { id } = req.query
    if (!id) {
      return res.status(400).json({ error: 'ID is required' })
    }

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', parseInt(id))

    if (error) throw error
    return res.status(200).json({ message: 'Message deleted successfully' })
  }
})
