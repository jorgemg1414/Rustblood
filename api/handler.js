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
      await apiLimiter(req)

      const route = routes[req.method]
      if (!route) {
        return res.status(405).json({ error: 'Method not allowed' })
      }

      return await route(req, res)
    } catch (error) {
      if (error.message === 'Too many requests. Please try again later.') {
        return res.status(429).json({ error: error.message })
      }
      if (error.message === 'No token provided') {
        return res.status(401).json({ error: 'No token provided' })
      }
      if (error.message === 'Invalid token') {
        return res.status(401).json({ error: 'Invalid token' })
      }
      if (error.message.includes('Access denied')) {
        return res.status(403).json({ error: error.message })
      }

      console.error('API Error:', error)
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

export { supabase }
