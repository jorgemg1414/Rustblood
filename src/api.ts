import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase solo para autenticación (sin datos sensibles)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://euqdhvxymafoylzckhgj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_jDX3NN8X4HAgih6vPjje0w_Y-CqT2Rm'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// URL del backend API
const API_URL = import.meta.env.VITE_API_URL || '/api'

// Función auxiliar para hacer peticiones al backend
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const session = await supabase.auth.getSession()
  const token = session.data.session?.access_token
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || 'Request failed')
  }

  return response.json()
}

// API para galería
export const galleryApi = {
  getAll: () => apiRequest('/gallery'),
  create: (data: { title?: string; image_url: string }) =>
    apiRequest('/gallery', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => apiRequest(`/gallery/${id}`, { method: 'DELETE' }),
}

// API para posts
export const postsApi = {
  getAll: () => apiRequest('/posts'),
  getById: (id: number) => apiRequest(`/posts/${id}`),
  create: (data: { title: string; content: string; image_url?: string }) =>
    apiRequest('/posts', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => apiRequest(`/posts/${id}`, { method: 'DELETE' }),
}

// API para mensajes
export const messagesApi = {
  getAll: () => apiRequest('/messages'),
  create: (data: { name: string; email: string; subject: string; message: string }) =>
    apiRequest('/messages', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => apiRequest(`/messages/${id}`, { method: 'DELETE' }),
}
