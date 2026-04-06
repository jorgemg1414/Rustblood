import { supabase } from '../config.js'

const WINDOW_SECONDS = 15 * 60 // 15 minutos
const MAX_REQUESTS = 100
const AUTH_MAX_REQUESTS = 10

/**
 * Crea un middleware de rate limit respaldado por Supabase.
 * Es seguro en serverless porque el estado vive en Postgres, no en memoria.
 *
 * Opciones:
 *   windowSeconds → tamaño de la ventana en segundos
 *   max           → peticiones permitidas por ventana
 *   isAuth        → preset para endpoints de login (max=10)
 *   scope         → etiqueta para separar contadores (p.ej. 'contact')
 */
export function rateLimit(options = {}) {
  const {
    windowSeconds = WINDOW_SECONDS,
    max = MAX_REQUESTS,
    isAuth = false,
    scope = 'api'
  } = options
  const limit = isAuth ? AUTH_MAX_REQUESTS : max
  const effectiveScope = isAuth ? 'auth' : scope

  return async (req) => {
    // Primera IP del X-Forwarded-For (Vercel prepende la IP real).
    // No confiar en el header completo porque el cliente puede inyectar IPs.
    const xff = req.headers['x-forwarded-for'] || ''
    const ip = xff.split(',')[0].trim() || 'unknown'
    const key = `${effectiveScope}:${ip}`

    const { data, error } = await supabase.rpc('check_rate_limit', {
      p_key: key,
      p_max: limit,
      p_window_seconds: windowSeconds
    })

    if (error) {
      // Fail-open: si Supabase falla no tiramos la web, pero lo logueamos.
      console.error('Rate limit check failed:', error)
      return
    }

    if (data === false) {
      throw new Error('Too many requests. Please try again later.')
    }
  }
}
