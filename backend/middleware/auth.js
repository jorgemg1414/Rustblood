import { supabase } from '../config/supabase.js'

export const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    // Verificar si el usuario es admin usando la función de la base de datos
    const { data: isAdminData, error: adminError } = await supabase
      .rpc('is_admin', { user_id: user.id })

    if (adminError || !isAdminData) {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' })
  }
}

export const authenticatePublic = async (req, res, next) => {
  // Para rutas públicas que solo necesitan validar el token si existe
  const authHeader = req.headers.authorization
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token)
      
      if (!error && user) {
        req.user = user
      }
    } catch (error) {
      // Si el token es inválido, simplemente continúa sin usuario
    }
  }
  
  next()
}
