<script setup lang="ts">
import { ref } from 'vue'
import rb1 from '../assets/photos/rb1.jpg'
import rb2 from '../assets/photos/rb2.jpeg'
import rb3 from '../assets/photos/rb3.jpeg'
import rb4 from '../assets/photos/rb4.jpeg'

interface Photo {
  id: number
  src: string
  alt: string
}

const photos = ref<Photo[]>([
  { id: 1, src: rb1, alt: 'Concierto 1' },
  { id: 2, src: rb2, alt: 'Concierto 2' },
  { id: 3, src: rb3, alt: 'Concierto 3' },
  { id: 4, src: rb4, alt: 'Concierto 4' }
])
const selectedPhoto = ref<Photo | null>(null)

const openLightbox = (photo: Photo) => {
  selectedPhoto.value = photo
}

const closeLightbox = () => {
  selectedPhoto.value = null
}
</script>

<template>
  <div class="galeria">
    <div class="container">
      <h1 class="title">Galería</h1>
      <p class="subtitle">Nuestros conciertos</p>
      
      <div class="gallery-grid">
        <div 
          v-for="photo in photos" 
          :key="photo.id" 
          class="gallery-item"
          @click="openLightbox(photo)"
        >
          <img :src="photo.src" :alt="photo.alt" />
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="selectedPhoto" class="lightbox" @click="closeLightbox">
        <button class="close-btn" @click="closeLightbox">×</button>
        <img :src="selectedPhoto.src" :alt="selectedPhoto.alt" />
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
}

.subtitle {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: 0.1em;
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

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
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
