<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

interface GalleryItem {
  id: number
  title: string
  image_url: string
  created_at: string
}

const isAuthenticated = ref(false)
const password = ref('')
const error = ref('')
const gallery = ref<GalleryItem[]>([])
const uploading = ref(false)
const newTitle = ref('')

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASS || 'rustblood2026'

const login = () => {
  if (password.value === ADMIN_PASSWORD) {
    isAuthenticated.value = true
    localStorage.setItem('admin_auth', 'true')
    fetchGallery()
  } else {
    error.value = 'Invalid password'
  }
}

const logout = () => {
  isAuthenticated.value = false
  localStorage.removeItem('admin_auth')
}

const fetchGallery = async () => {
  const { data, error: err } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (!err && data) {
    gallery.value = data
  }
}

const uploadPhoto = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  if (!file) return
  
  uploading.value = true
  error.value = ''

  try {
    const fileName = `${Date.now()}-${file.name}`
    
    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(fileName, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(fileName)

    const { error: insertError } = await supabase
      .from('gallery')
      .insert({ title: newTitle.value || 'Concert', image_url: publicUrl })

    if (insertError) throw insertError

    newTitle.value = ''
    input.value = ''
    await fetchGallery()
  } catch (e: any) {
    error.value = e.message
  } finally {
    uploading.value = false
  }
}

const deletePhoto = async (id: number) => {
  if (!confirm('Delete this photo?')) return

  const { error: deleteError } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id)

  if (!deleteError) {
    await fetchGallery()
  }
}

onMounted(() => {
  if (localStorage.getItem('admin_auth') === 'true') {
    isAuthenticated.value = true
    fetchGallery()
  }
})
</script>

<template>
  <div class="admin">
    <div v-if="!isAuthenticated" class="login-container">
      <h1>Admin Login</h1>
      <form @submit.prevent="login" class="login-form">
        <input 
          v-model="password" 
          type="password" 
          placeholder="Enter admin password"
          class="login-input"
        />
        <button type="submit" class="login-btn">Login</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <div v-else class="admin-panel">
      <div class="admin-header">
        <h1>Gallery Admin</h1>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>

      <div class="upload-section">
        <h2>Add New Photo</h2>
        <input 
          v-model="newTitle" 
          type="text" 
          placeholder="Photo title (optional)"
          class="title-input"
        />
        <input 
          type="file" 
          accept="image/*" 
          @change="uploadPhoto" 
          :disabled="uploading"
          class="file-input"
        />
        <p v-if="error" class="error">{{ error }}</p>
      </div>

      <div class="gallery-grid">
        <div v-for="item in gallery" :key="item.id" class="gallery-item">
          <img :src="item.image_url" :alt="item.title" />
          <div class="item-actions">
            <span class="item-title">{{ item.title }}</span>
            <button @click="deletePhoto(item.id)" class="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin {
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 4rem;
  background: #0a0a0a;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.login-container h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  color: #c44536;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-input {
  padding: 1rem;
  background: #111;
  border: 1px solid #333;
  color: #e8e8e8;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
}

.login-btn {
  padding: 1rem;
  background: #c44536;
  color: #0a0a0a;
  border: none;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:hover {
  background: #e05545;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
  color: #c44536;
  letter-spacing: 0.1em;
}

.logout-btn {
  padding: 0.5rem 1.5rem;
  background: transparent;
  border: 1px solid #c44536;
  color: #c44536;
  font-family: 'Oswald', sans-serif;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: #c44536;
  color: #0a0a0a;
}

.upload-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #111;
  border: 1px solid #222;
}

.upload-section h2 {
  font-family: 'Bebas Neue', sans-serif;
  color: #e8e8e8;
  margin-bottom: 1rem;
}

.title-input, .file-input {
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.title-input {
  padding: 0.8rem;
  background: #0a0a0a;
  border: 1px solid #333;
  color: #e8e8e8;
  font-family: 'Oswald', sans-serif;
}

.file-input {
  color: #888;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.gallery-item {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: 4px;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-title {
  font-family: 'Oswald', sans-serif;
  color: #ccc;
  font-size: 0.8rem;
}

.delete-btn {
  padding: 0.3rem 0.8rem;
  background: #c44536;
  color: #0a0a0a;
  border: none;
  font-family: 'Oswald', sans-serif;
  font-size: 0.7rem;
  cursor: pointer;
}

.error {
  color: #c44536;
  margin-top: 1rem;
}
</style>
