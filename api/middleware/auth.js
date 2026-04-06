import { supabase } from '../config.js'

export const authenticateAdmin = async (req) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided')
  }

  const token = authHeader.split(' ')[1]

  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    throw new Error('Invalid token')
  }

  const { data: isAdminData, error: adminError } = await supabase
    .rpc('is_admin', { user_id: user.id })

  if (adminError || !isAdminData) {
    throw new Error('Access denied. Admin privileges required.')
  }

  return user
}

export const authenticatePublic = async (req) => {
  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]

    try {
      const { data: { user }, error } = await supabase.auth.getUser(token)

      if (!error && user) {
        return user
      }
    } catch (error) {
      // Token invalid, continue without user
    }
  }

  return null
}
