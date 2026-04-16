<script setup lang="ts">
import { onMounted } from 'vue'
import rtscene from '../assets/rtscene.jpg'

const videos = [
  { id: 'cSLdIj_iwgI', title: 'RustBlood - Freedom of Die (Hoka Hey 2025)' },
]

onMounted(() => {
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
})
</script>

<template>
  <div class="videos-page">
    <section class="page-header">
      <div class="page-bg" :style="{ backgroundImage: `url(${rtscene})` }"></div>
      <h1 class="page-title reveal">Videos</h1>
      <p class="page-subtitle reveal reveal-delay-1">Watch us live</p>
    </section>

    <section class="videos-section">
      <div class="container">
        <div class="videos-grid">
          <div v-for="video in videos" :key="video.id" class="video-card reveal reveal-delay-2">
            <iframe
              :src="`https://www.youtube.com/embed/${video.id}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <p class="video-title">{{ video.title }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

.videos-page {
  min-height: 100vh;
}

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

.page-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 10vw, 6rem);
  letter-spacing: 0.2em;
  color: #c44536;
  margin: 0;
  position: relative;
  z-index: 1;
}

.page-subtitle {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  color: #666;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}

.videos-section {
  background: #0a0a0a;
  padding: 4rem 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.video-card {
  width: 100%;
  max-width: 560px;
}

.video-card iframe {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 8px;
}

.video-title {
  font-family: 'Oswald', sans-serif;
  color: #888;
  text-align: center;
  margin-top: 1rem;
}

/* Reveal animations */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 {
  transition-delay: 0.15s;
}

.reveal-delay-2 {
  transition-delay: 0.3s;
}

@media (max-width: 768px) {
  .page-header {
    padding: 6rem 2rem 3rem;
  }

  .container {
    padding: 2rem 1rem;
  }

  .videos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
