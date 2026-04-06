import { supabase } from './supabase'

const API_URL = import.meta.env.VITE_API_URL !== undefined
  ? import.meta.env.VITE_API_URL
  : (import.meta.env.PROD ? '' : 'http://localhost:3001')

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

  const response = await fetch(`${API_URL}/api${endpoint}`, {
    ...options,
    headers,
  })

  // Solo forzamos logout cuando la petición iba autenticada: un 401 en un
  // endpoint público (ej. POST /messages) no debe tirar al usuario al admin.
  if (response.status === 401 && token) {
    await supabase.auth.signOut()
    window.location.href = '/admin'
    throw new Error('Session expired')
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `Request failed (${response.status})`)
  }

  return response.json()
}

export const galleryApi = {
  getAll: () => apiRequest('/gallery'),
  create: (data: { title?: string; image_url: string }) =>
    apiRequest('/gallery', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: { title?: string }) =>
    apiRequest(`/gallery?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => apiRequest(`/gallery?id=${id}`, { method: 'DELETE' }),
}

export const postsApi = {
  getAll: () => apiRequest('/posts'),
  getById: (id: number) => apiRequest(`/posts?id=${id}`),
  create: (data: { title: string; content: string; image_url?: string }) =>
    apiRequest('/posts', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: { title?: string; content?: string; image_url?: string }) =>
    apiRequest(`/posts?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => apiRequest(`/posts?id=${id}`, { method: 'DELETE' }),
}

export const messagesApi = {
  getAll: () => apiRequest('/messages'),
  create: (data: { name: string; email: string; subject: string; message: string }) =>
    apiRequest('/messages', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: number) => apiRequest(`/messages?id=${id}`, { method: 'DELETE' }),
}
