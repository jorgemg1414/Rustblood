<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import type { Session } from '@supabase/supabase-js'

interface GalleryItem {
  id: number
  title: string
  image_url: string
  created_at: string
}

interface Post {
  id: number
  title: string
  content: string
  image_url: string
  created_at: string
}

const session = ref<Session | null>(null)
const loading = ref(true)
const activeTab = ref('gallery')
const email = ref('')
const password = ref('')
const error = ref('')

const gallery = ref<GalleryItem[]>([])
const posts = ref<Post[]>([])
const uploading = ref(false)
const newTitle = ref('')
const newContent = ref('')

supabase.auth.onAuthStateChange((_event, _session) => {
  session.value = _session
})

const signIn = async () => {
  try {
    error.value = ''
    const { data, error: err } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    
    if (err) throw err
    if (data.user) {
      fetchGallery()
      fetchPosts()
    }
  } catch (e: any) {
    error.value = e.message
  }
}

const signOut = async () => {
  await supabase.auth.signOut()
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

const fetchPosts = async () => {
  const { data, error: err } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (!err && data) {
    posts.value = data
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

const uploadPost = async (event: Event) => {
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
      .from('posts')
      .insert({ title: newTitle.value, content: newContent.value, image_url: publicUrl })

    if (insertError) throw insertError

    newTitle.value = ''
    newContent.value = ''
    input.value = ''
    await fetchPosts()
  } catch (e: any) {
    error.value = e.message
  } finally {
    uploading.value = false
  }
}

const createPost = async () => {
  if (!newTitle.value || !newContent.value) {
    error.value = 'Title and content are required'
    return
  }
  
  uploading.value = true
  error.value = ''

  try {
    const { error: insertError } = await supabase
      .from('posts')
      .insert({ title: newTitle.value, content: newContent.value })

    if (insertError) throw insertError

    newTitle.value = ''
    newContent.value = ''
    await fetchPosts()
  } catch (e: any) {
    error.value = e.message
  } finally {
    uploading.value = false
  }
}

const deletePost = async (id: number) => {
  if (!confirm('Delete this post?')) return

  const { error: deleteError } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (!deleteError) {
    await fetchPosts()
  }
}

onMounted(async () => {
  const { data: { session: currentSession } } = await supabase.auth.getSession()
  if (currentSession) {
    fetchGallery()
    fetchPosts()
  }
  loading.value = false
})
</script>

<template>
  <div class="admin">
    <div v-if="loading" class="loading-screen">
      <p>Loading...</p>
    </div>

    <div v-else-if="!session" class="login-container">
      <h1>Admin Login</h1>
      <form @submit.prevent="signIn" class="login-form">
        <input 
          v-model="email" 
          type="email" 
          placeholder="Admin email"
          class="login-input"
          required
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password"
          class="login-input"
          required
        />
        <button type="submit" class="login-btn">Login</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <div v-else class="admin-panel">
      <div class="admin-header">
        <h1>Admin Panel</h1>
        <button @click="signOut" class="logout-btn">Logout</button>
      </div>

      <div class="tabs">
        <button 
          :class="['tab', { active: activeTab === 'gallery' }]" 
          @click="activeTab = 'gallery'"
        >
          Gallery
        </button>
        <button 
          :class="['tab', { active: activeTab === 'posts' }]" 
          @click="activeTab = 'posts'"
        >
          News
        </button>
      </div>

      <!-- Gallery Section -->
      <div v-if="activeTab === 'gallery'" class="tab-content">
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

      <!-- Posts Section -->
      <div v-if="activeTab === 'posts'" class="tab-content">
        <div class="upload-section">
          <h2>Add New Post</h2>
          <input 
            v-model="newTitle" 
            type="text" 
            placeholder="Post title"
            class="title-input"
          />
          <textarea 
            v-model="newContent" 
            placeholder="Post content"
            class="content-input"
            rows="4"
          ></textarea>
          <button @click="createPost" :disabled="uploading" class="submit-btn">
            {{ uploading ? 'Creating...' : 'Create Post' }}
          </button>
          <p class="divider">or add with image:</p>
          <input 
            type="file" 
            accept="image/*" 
            @change="uploadPost" 
            :disabled="uploading"
            class="file-input"
          />
          <p v-if="error" class="error">{{ error }}</p>
        </div>

        <div class="posts-list">
          <div v-for="post in posts" :key="post.id" class="post-item">
            <div class="post-info">
              <h3>{{ post.title }}</h3>
              <p>{{ post.content.substring(0, 100) }}...</p>
            </div>
            <button @click="deletePost(post.id)" class="delete-btn">Delete</button>
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

.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #666;
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

.tabs {
  display: flex;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.tab {
  padding: 1rem 2rem;
  background: transparent;
  border: 1px solid #333;
  color: #666;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.tab.active {
  background: #c44536;
  border-color: #c44536;
  color: #0a0a0a;
}

.tab-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.upload-section {
  background: #111;
  border: 1px solid #222;
  padding: 2rem;
  margin-bottom: 2rem;
}

.upload-section h2 {
  font-family: 'Bebas Neue', sans-serif;
  color: #e8e8e8;
  margin-bottom: 1rem;
}

.title-input, .file-input, .content-input {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;
}

.title-input, .content-input {
  padding: 0.8rem;
  background: #0a0a0a;
  border: 1px solid #333;
  color: #e8e8e8;
  font-family: 'Oswald', sans-serif;
}

.content-input {
  resize: vertical;
  max-width: 100%;
}

.file-input {
  color: 888;
}

.submit-btn {
  padding: 1rem 2rem;
  background: #c44536;
  color: #0a0a0a;
  border: none;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 1rem;
}

.submit-btn:hover {
  background: #e05545;
}

.submit-btn:disabled {
  background: #666;
  cursor: not-allowed;
}

.divider {
  color: #666;
  font-family: 'Oswald', sans-serif;
  margin: 1.5rem 0 1rem;
  text-align: center;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
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

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111;
  border: 1px solid #222;
  padding: 1rem;
}

.post-info h3 {
  font-family: 'Bebas Neue', sans-serif;
  color: #e8e8e8;
  margin: 0 0 0.5rem;
}

.post-info p {
  font-family: 'Oswald', sans-serif;
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.error {
  color: #c44536;
  margin-top: 1rem;
}
</style>
