<script setup lang="ts">
import { onMounted } from 'vue'
import albumCover from '../assets/album.jpg'

interface Album {
  title: string
  year: number
  cover: string
  description: string
  tracks: string[]
}

const albums: Album[] = [
  { 
    title: 'Rust & Bone', 
    year: 2025, 
    cover: albumCover,
    description: 'Our first album, a deep exploration of human resilience.',
    tracks: ['Dissolution Beyond', 'In a crypt', 'Hollow Throne', 'Freedom of Die', 'Hope Denied']
  },
]

const socialLinks = [
  { name: 'Spotify', url: '#', icon: '🎵' },
  { name: 'Apple Music', url: '#', icon: '🎧' },
  { name: 'YouTube', url: 'https://www.youtube.com/@Rustblood_band', icon: '▶️' },
  { name: 'Bandcamp', url: '#', icon: '🎸' }
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
      <h1 class="page-title reveal">Music</h1>
      <p class="page-subtitle reveal reveal-delay-1">Our discography</p>
    </section>

    <section class="albums-section">
      <div class="container">
        <div v-for="album in albums" :key="album.title" class="album-card reveal reveal-delay-2">
          <img :src="album.cover" alt="Album cover" class="album-cover" />
          <div class="album-content">
            <h2 class="album-title">{{ album.title }}</h2>
            <span class="album-year">{{ album.year }}</span>
            <p class="album-description">{{ album.description }}</p>
            <div class="album-tracks">
              <h4>Tracklist</h4>
              <ul>
                <li v-for="(track, index) in album.tracks" :key="track">
                  <span class="track-num">{{ index + 1 }}</span>
                  <span class="track-name">{{ track }}</span>
                </li>
              </ul>
            </div>
            <div class="album-links">
              <a v-for="social in socialLinks" :key="social.name" :href="social.url" class="social-btn">
                {{ social.icon }} {{ social.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;600&display=swap');

.musica {
  min-height: 100vh;
  padding-top: 80px;
}

.page-header {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, #0a0a0a 0%, #111 100%);
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
  filter: grayscale(0.5);
  transition: filter 0.3s ease;
  border-radius: 4px;
}

.album-card:hover .album-cover {
  filter: grayscale(0);
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
}

.social-btn:hover {
  border-color: #c44536;
  color: #c44536;
}

@media (max-width: 768px) {
  .album-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .album-links {
    justify-content: center;
  }
}
</style>
