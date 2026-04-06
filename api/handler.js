import { supabase, setCorsHeaders } from './config.js'
import { authenticateAdmin } from './middleware/auth.js'
import { rateLimit } from './middleware/rateLimit.js'

const apiLimiter = rateLimit()
const authLimiter = rateLimit({ isAuth: true })

export function createHandler(routes) {
  return async function handler(req, res) {
    const origin = req.headers.origin || ''
    setCorsHeaders(res, origin)

    if (req.method === 'OPTIONS') {
      return res.status(200).end()
    }

    try {
      const route = routes[req.method]
      if (!route) {
        return res.status(405).json({ error: 'Method not allowed' })
      }

      // Rate limit global (por IP). Los endpoints pueden añadir limitadores
      // más estrictos usando requireRateLimit(req, limiter).
      await apiLimiter(req)

      return await route(req, res)
    } catch (error) {
      const message = typeof error?.message === 'string' ? error.message : ''

      if (message === 'Too many requests. Please try again later.') {
        return res.status(429).json({ error: message })
      }
      if (message === 'No token provided' || message === 'Invalid token') {
        return res.status(401).json({ error: message })
      }
      if (message.includes('Access denied')) {
        return res.status(403).json({ error: message })
      }

      // Log detallado en servidor para diagnosticar (Vercel logs),
      // pero respuesta genérica al cliente.
      console.error('[API Error]', {
        method: req.method,
        url: req.url,
        message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint
      })
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export async function requireAdmin(req) {
  return await authenticateAdmin(req)
}

export async function requireAuthLimit(req) {
  await authLimiter(req)
}

export async function requireRateLimit(req, limiter) {
  await limiter(req)
}

export { supabase, rateLimit }
