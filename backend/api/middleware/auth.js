import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

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

  // Verificar si el usuario es admin usando la función de la base de datos
  const { data: isAdminData, error: adminError } = await supabase
    .rpc('is_admin', { user_id: user.id })

  if (adminError || !isAdminData) {
    throw new Error('Access denied. Admin privileges required.')
  }

  return user
}

export const authenticatePublic = async (req) => {
  // Para rutas públicas que solo necesitan validar el token si existe
  const authHeader = req.headers.authorization
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token)
      
      if (!error && user) {
        return user
      }
    } catch (error) {
      // Si el token es inválido, simplemente continúa sin usuario
    }
  }
  
  return null
}
