<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { galleryApi } from '../api'

interface Photo {
  id: number
  title: string
  image_url: string
}

const photos = ref<Photo[]>([])
const selectedPhoto = ref<Photo | null>(null)
const loading = ref(true)

const fetchPhotos = async () => {
  loading.value = true
  try {
    photos.value = await galleryApi.getAll()
  } catch (error) {
    console.error('Error fetching photos:', error)
  }
  loading.value = false
}

const openLightbox = (photo: Photo) => {
  selectedPhoto.value = photo
}

const closeLightbox = () => {
  selectedPhoto.value = null
}

onMounted(() => {
  fetchPhotos()
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

  setTimeout(() => {
    document.querySelectorAll('.gallery-item').forEach((el, i) => {
      el.classList.add('reveal')
      el.classList.add(`reveal-delay-${(i % 4) + 1}`)
      observer.observe(el)
    })
  }, 100)
})
</script>

<template>
  <div class="galeria">
    <div class="container">
      <h1 class="title reveal">Gallery</h1>
      <p class="subtitle reveal reveal-delay-1">Our concerts</p>
      
      <div v-if="loading" class="loading">Loading...</div>
      
      <div v-else-if="photos.length === 0" class="empty">
        <p>No photos yet. <a href="/admin">Add photos</a></p>
      </div>
      
      <div v-else class="gallery-grid">
        <div 
          v-for="photo in photos" 
          :key="photo.id" 
          class="gallery-item"
          @click="openLightbox(photo)"
        >
          <img :src="photo.image_url" :alt="photo.title" />
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="selectedPhoto" class="lightbox" @click="closeLightbox">
        <button class="close-btn" @click="closeLightbox">×</button>
        <img :src="selectedPhoto.image_url" :alt="selectedPhoto.title" />
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.galeria {
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  letter-spacing: 0.2em;
  color: #c44536;
  text-align: center;
  margin: 0;
  padding-top: 80px;
}

.subtitle {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: 0.1em;
}

.loading, .empty {
  text-align: center;
  color: #666;
  font-family: 'Oswald', sans-serif;
  padding: 4rem;
}

.empty a {
  color: #c44536;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  cursor: pointer;
  border-radius: 4px;
}

.gallery-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, rgba(196,69,54,0.3) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.gallery-item:hover::before {
  opacity: 1;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover img {
  transform: scale(1.15);
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.lightbox img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 4px;
}

.close-btn {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 3rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #c44536;
}

@media (max-width: 768px) {
  .title {
    font-size: 3rem;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
