<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import logo from '../assets/logo.png'
import albumCover from '../assets/album.jpg'
import heroVideo from '../assets/prueba_home.mp4'
import rtscene from '../assets/rtscene.jpg'
import rb7 from '../assets/photos/rb7.jpeg'
import tepaMetalFest from '../assets/photos/tepa-metal-fest.jpg'

const particles = ref<{ id: number; left: string; delay: string; size: string }[]>([])

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

  particles.value = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    size: `${Math.random() * 10 + 5}px`
  }))
})
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="particles">
        <div 
          v-for="p in particles" 
          :key="p.id" 
          class="particle"
          :style="{ left: p.left, animationDelay: p.delay, width: p.size, height: p.size }"
        ></div>
      </div>
      <div class="hero-content">
        <img :src="logo" alt="Rustblood" class="hero-logo" />
        <p class="tagline">Born of Rust forged in Blood</p>
        <div class="hero-btns">
          <RouterLink to="/musica" class="btn btn-primary">Listen Now</RouterLink>
          <RouterLink to="/eventos" class="btn btn-secondary">View Dates</RouterLink>
        </div>
      </div>
      <video class="hero-video" autoplay loop muted playsinline>
        <source :src="heroVideo" type="video/mp4" />
      </video>
    </section>

    <section class="about-preview">
      <div class="container">
        <h2 class="section-title reveal">About Us</h2>
        <p class="reveal reveal-delay-1">
          Formed in January 2024 in Tepatitlán de Morelos, in the Los Altos region of Jalisco, Mexico. Rustblood is a Mexican progressive death metal band seeking to carve new paths in traditional sonic brutality. The band's influences include Death, Gojira, Opeth, and Dream Theater, blending the crudeness of death metal with progressive elements and melodic passages.

Their music is characterized by powerful riffs, non-linear structures, carefully crafted melodic passages, and intense execution both in the studio and live. Founded by bassist Lemmy Yeudhiel and drummer Alan Gómez, the current lineup also includes guitarist Joshua Giacomo and vocalist/guitarist Edson Muñoz.

Their lyrical and musical approach addresses existential, philosophical, and psychological themes, exploring the collapse of the self, internal chaos, and freedom through pain. In a short time, Rustblood has presented six original songs: Hope Denied, Forged in Blood, In a Crypt, Hollow Throne, Dissolution Beyond, and Freedom of Die. They are currently composing new material to expand their sonic proposal.
        </p>
        <RouterLink to="/contacto" class="btn btn-secondary reveal reveal-delay-2">Contact Us</RouterLink>
      </div>
    </section>

    <section class="photo-section">
      <div class="parallax-photo reveal" :style="{ backgroundImage: `url(${rtscene})` }"></div>
    </section>

    <section class="featured-music">
      <div class="container">
        <h2 class="section-title reveal">Latest Release</h2>
        <div class="featured-album reveal reveal-delay-1">
          <img :src="albumCover" alt="Dissolution Beyond" class="album-cover" />
          <div class="album-info">
            <h3>Dissolution Beyond</h3>
            <p class="album-year">PRÓXIMAMENTE 2026</p>
            <RouterLink to="/musica" class="btn btn-primary">View Discography</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="photo-section">
      <div class="parallax-photo parallax-photo--top reveal" :style="{ backgroundImage: `url(${rb7})` }"></div>
    </section>

    <section class="next-show">
      <div class="container">
        <h2 class="section-title reveal">Next Show</h2>
        <div class="next-show-card reveal reveal-delay-1">
          <img :src="tepaMetalFest" alt="Tepa Metal Fest" class="next-show-flyer" />
          <div class="next-show-info">
            <div class="next-show-date">
              <span class="date-num">07</span>
              <span class="date-month">NOV</span>
              <span class="date-day">SAB</span>
            </div>
            <div class="next-show-details">
              <span class="next-show-city">Tepatitlán, Jalisco</span>
              <span class="next-show-venue">Terraza Alameda</span>
              <span class="next-show-address">Av. Ricardo Alcalá #69</span>
            </div>
            <a href="https://www.ticketopolis.com/tepametalfest/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Tickets</a>
          </div>
        </div>
        <RouterLink to="/eventos" class="btn btn-secondary reveal reveal-delay-2">All Events</RouterLink>
      </div>
    </section>

    <section class="members-cta">
      <div class="container">
        <h2 class="section-title reveal">The Band</h2>
        <p class="reveal reveal-delay-1">Meet the people behind the sound.</p>
        <div class="cta-btns reveal reveal-delay-2">
          <RouterLink to="/miembros" class="btn btn-primary">Meet the Members</RouterLink>
          <RouterLink to="/galeria" class="btn btn-secondary">View Gallery</RouterLink>
          <RouterLink to="/videos" class="btn btn-secondary">Watch Videos</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;600&display=swap');

.home {
  min-height: 100vh;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 120px;
  z-index: 1;
}

.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  bottom: -20px;
  background: rgba(196, 69, 54, 0.6);
  border-radius: 50%;
  animation: rise 8s infinite ease-in;
}

@keyframes rise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100vh) scale(0);
    opacity: 0;
  }
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(8px);
  opacity: 0.4;
  z-index: 0;
}


.hero-content {
  text-align: center;
  z-index: 1;
  padding: 2rem;
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-logo {
  max-width: 600px;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 20px rgba(196, 69, 54, 0.3));
  transition: transform 0.5s ease, filter 0.5s ease;
  animation: logoGlow 3s ease-in-out infinite;
}

@keyframes logoGlow {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(196, 69, 54, 0.3)); }
  50% { filter: drop-shadow(0 0 40px rgba(196, 69, 54, 0.6)); }
}

.hero-logo:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 50px rgba(196, 69, 54, 0.8));
}


.tagline {
  font-family: 'Oswald', sans-serif;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #666;
  margin: 1rem 0 3rem;
  animation: fadeInUp 1s ease-out 0.3s backwards;
}


.hero-btns {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btns .btn {
  animation: fadeInUp 1s ease-out 0.6s backwards;
}

.btn {
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.btn:hover {
  transform: scale(1.05) translateY(-3px);
}

.btn:active {
  transform: scale(0.98);
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: #c44536;
  color: #0a0a0a;
}

.btn-primary:hover {
  background: #e05545;
  box-shadow: 0 0 30px rgba(196, 69, 54, 0.5);
  transform: translateY(-3px);
}

.btn-secondary {
  background: transparent;
  color: #c44536;
  border: 2px solid #c44536;
}

.btn-secondary:hover {
  background: #c44536;
  color: #0a0a0a;
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(196, 69, 54, 0.4);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease-out forwards;
}

.about-preview {
  background: linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%);
  text-align: center;
  position: relative;
  z-index: 1;
}

.about-preview .container {
  animation-delay: 0.2s;
}

.about-preview p {
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #aaa;
  max-width: 700px;
  margin: 0 auto 2rem;
}

.photo-section {
  position: relative;
  height: 70vh;
  overflow: hidden;
}

.photo-section::before {
  top: 0;
}

.photo-section::after {
  bottom: 0;
}

.parallax-photo.revealed {
  opacity: 1;
  transform: scale(1);
}

.parallax-photo {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.1);
  transition: opacity 0.8s ease, transform 0.8s ease;
  position: relative;
}

.featured-music {
  background: #0a0a0a;
}

.parallax-photo {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: block;
}

.featured-music .container {
  animation-delay: 0.4s;
}

.featured-album {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.album-cover {
  width: 300px;
  height: 300px;
  object-fit: cover;
  transition: transform 0.5s ease;
  cursor: pointer;
  border-radius: 4px;
}

.album-cover:hover {
  transform: scale(1.1) rotate(5deg);
}

.album-info {
  text-align: center;
}

.album-info h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
  color: #e8e8e8;
  margin: 0 0 0.5rem;
  transition: color 0.3s ease;
}

.album-info h3:hover {
  color: #c44536;
}

.album-info p {
  color: #666;
  margin-bottom: 1.5rem;
}

@media (prefers-reduced-motion: reduce) {
  .hero-content,
  .hero-logo,
  .hero-bg,
  .tagline,
  .container {
    animation: none;
    opacity: 1;
    transform: none;
  }
  
  .btn::before {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-logo {
    max-width: 100%;
    padding: 0 1rem;
  }

  .tagline {
    font-size: 1rem;
    letter-spacing: 0.15em;
    padding: 0 1rem;
  }


  .hero-btns {
    gap: 1rem;
    padding: 0 1rem;
  }

  .hero-btns .btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  .about-preview .container,
  .featured-music .container {
    padding: 3rem 1rem;
  }

  .about-preview p {
    font-size: 1rem;
    text-align: left;
    padding: 0 1rem;
  }

  .featured-album {
    flex-direction: column;
    gap: 1.5rem;
  }

  .album-cover {
    width: 200px;
    height: 200px;
  }

  .album-info h3 {
    font-size: 1.8rem;
  }

  .album-info .album-year {
    font-size: 0.9rem;
  }
}

.parallax-photo--top {
  background-position: top center;
}

.next-show {
  background: #0a0a0a;
  text-align: center;
}

.next-show-card {
  display: flex;
  align-items: center;
  gap: 3rem;
  background: #111;
  border: 1px solid #222;
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto 2rem;
  flex-wrap: wrap;
}

.next-show-flyer {
  width: 280px;
  height: auto;
  display: block;
  flex-shrink: 0;
}

.next-show-info {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
}

.next-show-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
}

.next-show-date .date-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.5rem;
  color: #c44536;
  line-height: 1;
}

.next-show-date .date-month {
  font-family: 'Oswald', sans-serif;
  font-size: 0.85rem;
  color: #666;
  letter-spacing: 0.1em;
}

.next-show-date .date-day {
  font-family: 'Oswald', sans-serif;
  font-size: 0.7rem;
  color: #444;
  letter-spacing: 0.1em;
}

.next-show-details {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.next-show-city {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #e8e8e8;
}

.next-show-venue {
  font-family: 'Oswald', sans-serif;
  color: #666;
  font-size: 0.95rem;
}

.next-show-address {
  font-family: 'Oswald', sans-serif;
  color: #444;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .next-show-card {
    flex-direction: column;
    gap: 0;
  }

  .next-show-flyer {
    width: 100%;
  }

  .next-show-details {
    text-align: center;
  }
}

.members-cta {
  background: linear-gradient(180deg, #0a0a0a 0%, #111 100%);
  text-align: center;
  border-top: 1px solid #1a1a1a;
}

.members-cta p {
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
  font-size: 1.1rem;
  color: #aaa;
  margin-bottom: 2rem;
}

.cta-btns {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .album-cover {
    width: 150px;
    height: 150px;
  }

  .hero-btns {
    flex-direction: column;
    align-items: center;
  }
}
</style>
