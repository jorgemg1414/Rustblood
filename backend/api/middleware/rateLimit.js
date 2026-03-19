const rateLimitMap = new Map()

const WINDOW_MS = 15 * 60 * 1000 // 15 minutos
const MAX_REQUESTS = 100 // max requests por ventana
const AUTH_MAX_REQUESTS = 10 // max intentos de login por ventana

export function rateLimit(options = {}) {
  const { windowMs = WINDOW_MS, max = MAX_REQUESTS, isAuth = false } = options
  const limit = isAuth ? AUTH_MAX_REQUESTS : max

  return (req) => {
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
    const key = `${ip}-${isAuth ? 'auth' : 'api'}`

    const now = Date.now()
    const windowStart = now - windowMs

    if (!rateLimitMap.has(key)) {
      rateLimitMap.set(key, [])
    }

    const requests = rateLimitMap.get(key).filter(time => time > windowStart)
    rateLimitMap.set(key, requests)

    if (requests.length >= limit) {
      throw new Error('Too many requests. Please try again later.')
    }

    requests.push(now)
  }
}

export function cleanupRateLimit() {
  const now = Date.now()
  for (const [key, requests] of rateLimitMap.entries()) {
    const valid = requests.filter(time => time > now - WINDOW_MS)
    if (valid.length === 0) {
      rateLimitMap.delete(key)
    } else {
      rateLimitMap.set(key, valid)
    }
  }
}

setInterval(cleanupRateLimit, 60 * 1000)
