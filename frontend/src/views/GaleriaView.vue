<script setup lang="ts">
import { ref } from 'vue'
import { gallery } from '../data/content'
import rtscene from '../assets/rtscene.jpg'
const photos = gallery
const selectedPhoto = ref<any>(null)
const openLightbox = (p: any) => selectedPhoto.value = p
const closeLightbox = () => selectedPhoto.value = null
</script>

<template>
  <div class="galeria">
    <section class="page-header">
      <div class="page-bg" :style="{ backgroundImage: `url(${rtscene})` }"></div>
      <h1 class="title">Gallery</h1>
      <p class="subtitle">Our concerts and live shows</p>
    </section>
    <div class="container">
      <div class="gallery-grid">
        <div v-for="photo in photos" :key="photo.id" class="gallery-item" @click="openLightbox(photo)">
          <img :src="photo.image" :alt="photo.title" />
        </div>
      </div>
    </div>
    <Teleport to="body">
      <div v-if="selectedPhoto" class="lightbox" @click="closeLightbox">
        <button class="close-btn" @click="closeLightbox">×</button>
        <img :src="selectedPhoto.image" :alt="selectedPhoto.title" />
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.galeria { min-height: 100vh; padding-bottom: 4rem; }
.page-header {
  text-align: center;
  padding: 6rem 2rem 4rem;
  background: linear-gradient(180deg, rgba(10,10,10,0.8) 0%, rgba(17,17,17,0.9) 100%);
  position: relative;
  overflow: hidden;
}
.page-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  opacity: 0.3;
  z-index: 0;
}
.title {
  position: relative;
  z-index: 1;
}
.subtitle {
  position: relative;
  z-index: 1;
}
.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 1; }
.title { font-family: 'Bebas Neue', sans-serif; font-size: 4rem; letter-spacing: 0.2em; color: #c44536; text-align: center; padding-top: 80px; margin: 0; }
.subtitle { font-family: 'Oswald', sans-serif; font-size: 1.2rem; color: #666; text-align: center; margin-bottom: 3rem; }
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.gallery-item { aspect-ratio: 4/3; overflow: hidden; cursor: pointer; border-radius: 4px; }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.gallery-item:hover img { transform: scale(1.15); }
.gallery-item:active img { transform: scale(1.1); }
.lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 2rem; }
.lightbox img { max-width: 90vw; max-height: 90vh; object-fit: contain; }
.close-btn { position: absolute; top: 2rem; right: 2rem; background: none; border: none; color: #fff; font-size: 3rem; cursor: pointer; }

@media (max-width: 768px) {
  .page-header { padding: 6rem 2rem 3rem; }
  .container { padding: 0 1rem; }
  .title { font-size: 3rem; }
  .subtitle { font-size: 1rem; margin-bottom: 2rem; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
}

@media (max-width: 480px) {
  .gallery-grid { grid-template-columns: 1fr 1fr; gap: 0.5rem; }
  .close-btn { top: 1rem; right: 1rem; font-size: 2rem; }
}
</style>