<script setup lang="ts">
import { onMounted } from 'vue'
import albumCover from '../assets/album.jpg'
import rtscene from '../assets/rtscene.jpg'
import { Music, Headphones, Play, Guitar } from 'lucide-vue-next'

interface Album {
  title: string
  year: number
  cover: string
  description: string
  tracks: string[]
  released?: boolean
}

const albums: Album[] = [
  { 
    title: 'Dissolution Beyond',
    year: 2026, 
    cover: albumCover,
    description: 'Our first album, a deep exploration of human resilience.',
    tracks: ['Dissolution Beyond', 'In a crypt', 'Hollow Throne', 'Freedom of Die', 'Hope Denied'],
    released: true
  },
]

const videos = [
  { id: 'cSLdIj_iwgI', title: 'RustBlood - Freedom of Die (Hoka Hey 2025)' },
]

const socialLinks = [
  { name: 'Spotify', url: '#', icon: Music },
  { name: 'Apple Music', url: '#', icon: Headphones },
  { name: 'YouTube', url: 'https://www.youtube.com/@Rustblood_band', icon: Play },
  { name: 'Bandcamp', url: '#', icon: Guitar }
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
  <div class="musica">
    <section class="page-header">
      <div class="page-bg" :style="{ backgroundImage: `url(${rtscene})` }"></div>
      <h1 class="page-title reveal">Music</h1>
      <p class="page-subtitle reveal reveal-delay-1">Our discography</p>
    </section>

    <section class="albums-section">
      <div class="container">
        <div v-for="album in albums" :key="album.title" class="album-card reveal reveal-delay-2" :class="{ 'not-released': !album.released }">
          <img :src="album.cover" alt="Album cover" class="album-cover" />
          <div class="album-content">
            <h2 class="album-title">{{ album.title }}</h2>
            <span class="album-year">{{ album.year }}</span>
            <span v-if="!album.released" class="coming-soon">PRÓXIMAMENTE</span>
            <p class="album-description">{{ album.description }}</p>
            <div v-if="album.released" class="album-tracks">
              <h4>Tracklist</h4>
              <ul>
                <li v-for="(track, index) in album.tracks" :key="track">
                  <span class="track-num">{{ index + 1 }}</span>
                  <span class="track-name">{{ track }}</span>
                </li>
              </ul>
            </div>
            <div v-if="album.released" class="album-links">
              <a v-for="social in socialLinks" :key="social.name" :href="social.url" class="social-btn">
                <component :is="social.icon" :size="16" />
                {{ social.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="videos-section">
      <div class="container">
        <h2 class="section-title reveal">Videos</h2>
        <div class="videos-grid">
          <div v-for="video in videos" :key="video.id" class="video-card reveal reveal-delay-1">
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

.musica {
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
}

.page-subtitle {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  color: #666;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.album-card {
  display: flex;
  gap: 3rem;
  background: #111;
  border: 1px solid #222;
  margin-bottom: 3rem;
  padding: 2rem;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.album-card:hover {
  border-color: #c44536;
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(196, 69, 54, 0.2);
}

.album-cover {
  width: 250px;
  height: 250px;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 4px;
}

.album-content {
  flex: 1;
}

.album-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  letter-spacing: 0.1em;
  color: #e8e8e8;
  margin: 0;
}

.album-year {
  color: #c44536;
  font-size: 1rem;
}

.album-description {
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
  color: #888;
  margin: 1rem 0;
}

.album-tracks h4 {
  font-family: 'Oswald', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #666;
  margin-bottom: 0.5rem;
}

.album-tracks ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}

.album-tracks li {
  display: flex;
  gap: 1rem;
  padding: 0.3rem 0;
  font-family: 'Oswald', sans-serif;
  font-size: 0.9rem;
  color: #aaa;
}

.track-num {
  color: #c44536;
  width: 20px;
}

.album-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.coming-soon {
  display: inline-block;
  background: #c44536;
  color: #0a0a0a;
  font-family: 'Oswald', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  padding: 0.3rem 0.8rem;
  margin-left: 1rem;
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 5px rgba(196, 69, 54, 0.5); }
  50% { box-shadow: 0 0 15px rgba(196, 69, 54, 0.8); }
}

.not-released {
  opacity: 0.9;
  border-style: dashed;
}

.social-btn {
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #333;
  color: #888;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.social-btn:hover {
  border-color: #c44536;
  color: #c44536;
}

.videos-section {
  background: #0a0a0a;
  padding: 4rem 0;
}

.section-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.5rem;
  letter-spacing: 0.15em;
  color: #c44536;
  text-align: center;
  margin-bottom: 2rem;
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

@media (max-width: 768px) {
  .page-header {
    padding: 6rem 2rem 3rem;
  }

  .container {
    padding: 2rem 1rem;
  }

  .album-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem;
  }

  .album-cover {
    width: 200px;
    height: 200px;
  }

  .album-content {
    width: 100%;
  }

  .album-links {
    justify-content: center;
  }

  .videos-grid {
    grid-template-columns: 1fr;
  }

  .coming-soon {
    display: block;
    margin: 0.5rem 0 0;
  }
}

@media (max-width: 480px) {
  .album-cover {
    width: 150px;
    height: 150px;
  }

  .album-title {
    font-size: 1.5rem;
  }

  .social-btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.7rem;
  }
}
</style>
