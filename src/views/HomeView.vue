<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logo from '../assets/logo.png'
import rtscene from '../assets/rtscene.jpg'
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <img :src="logo" alt="Rustblood" class="hero-logo" />
        <p class="tagline">Born of Rust forged in Blood</p>
        <div class="hero-btns">
          <RouterLink to="/musica" class="btn btn-primary">Escuchar Ahora</RouterLink>
          <RouterLink to="/eventos" class="btn btn-secondary">Ver Fechas</RouterLink>
        </div>
      </div>
      <div class="hero-bg" :style="{ backgroundImage: `url(${rtscene})` }"></div>
    </section>

    <section class="about-preview">
      <div class="container">
        <h2 class="section-title">Sobre Nosotros</h2>
        <p>
          Formada en enero de 2024 en Tepatitlán de Morelos, en la región de Los Altos de Jalisco, México. Rustblood es una banda mexicana de death metal progresivo que busca abrir nuevas grietas en la brutalidad sonora tradicional. Las inﬂuencias de la banda incluyen a Death, Gojira, Opeth, y Dream Theater, entre otros, mezclando la crudeza del death metal con elementos progresivos y pasajes melódicos.

Su música se caracteriza por riffs contundentes, estructuras no lineales, pasajes melódicos cuidadosamente elaborados y una ejecución intensa tanto en estudio como en vivo. Fundada por el bajista Lemmy Yeudhiel y el baterista Alan Gómez, la alineación actual incluye también al guitarrista Joshua Giacomo y al vocalista/guitarrista Edson Muñoz.

Su enfoque lírico y musical aborda temas existenciales, ﬁlosóﬁcos y psicológicos, explorando el colapso del ser, el caos interno y la libertad a través del dolor. En poco tiempo, Rustblood ha presentado seis canciones originales: Hope Denied, Forged in blood, In a Crypt, Holow Throne, Dissolution Beyond y Freedom of Die. Actualmente se encuentran componiendo nuevo material para ampliar su propuesta sonora.
        </p>
        <RouterLink to="/contacto" class="btn btn-secondary">Contáctanos</RouterLink>
      </div>
    </section>

    <section class="featured-music">
      <div class="container">
        <h2 class="section-title">Último Lanzamiento</h2>
        <div class="featured-album">
          <div class="album-cover">🔥</div>
          <div class="album-info">
            <h3>Rust & Bone</h3>
            <p>2025</p>
            <RouterLink to="/musica" class="btn btn-primary">Ver Discografía</RouterLink>
          </div>
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
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  opacity: 0.3;
  z-index: 0;
  animation: bgPulse 8s ease-in-out infinite;
}

@keyframes bgPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
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

.band-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(4rem, 15vw, 12rem);
  letter-spacing: 0.3em;
  margin: 0;
  color: #c44536;
  text-shadow: 
    0 0 20px rgba(196, 69, 54, 0.5),
    0 0 40px rgba(196, 69, 54, 0.3),
    0 0 80px rgba(196, 69, 54, 0.1);
  animation: flicker 4s infinite;
}

@keyframes flicker {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
  96% { opacity: 0.9; }
  97% { opacity: 1; }
}

.tagline {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
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

.featured-music {
  background: #0a0a0a;
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
  font-size: 8rem;
  filter: grayscale(0.5);
  transition: transform 0.5s ease, filter 0.5s ease;
  cursor: pointer;
}

.album-cover:hover {
  transform: scale(1.1) rotate(5deg);
  filter: grayscale(0);
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
</style>
