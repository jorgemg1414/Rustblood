<script setup lang="ts">
interface Service {
  icon: string
  title: string
  description: string
  features: string[]
}

const services: Service[] = [
  {
    icon: '🎵',
    title: 'Producción Musical',
    description: 'Grabación, mezcla y masterización con sonido profesional adaptado a metal y géneros pesados.',
    features: ['Grabación en estudio', 'Mezcla y masterización', 'Producción ejecutiva', 'Asesoría musical']
  },
  {
    icon: '🎸',
    title: 'Sesión de Músicos',
    description: 'Contamos con músicos profesionales para sesiones de grabación en tus proyectos.',
    features: ['Guitarras eléctricas y acústicas', 'Bajo', 'Batería', 'Teclados y sintes']
  },
  {
    icon: '🎬',
    title: 'Producción Audiovisual',
    description: 'Creación de contenido visual para bandas: videoclips, documentales y material promocional.',
    features: ['Videoclips', 'Documentales', 'Grabación en vivo', 'Animación']
  },
  {
    icon: '📢',
    title: 'Booking y Gestión',
    description: 'Gestionamos actuaciones, giras y contactos con festivales y salas.',
    features: ['Gestión de boliches', 'Contacto con festivales', 'Logística de gira', 'Asesoría de imagen']
  }
]
</script>

<template>
  <div class="servicios">
    <section class="page-header">
      <h1 class="page-title">Servicios</h1>
      <p class="page-subtitle">Lo que oferecemos</p>
    </section>

    <section class="services-section">
      <div class="container">
        <div class="services-grid">
          <div v-for="service in services" :key="service.title" class="service-card">
            <div class="service-icon">{{ service.icon }}</div>
            <h2 class="service-title">{{ service.title }}</h2>
            <p class="service-description">{{ service.description }}</p>
            <ul class="service-features">
              <li v-for="feature in service.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
        </div>

        <div class="cta-section">
          <p>¿Interesado en alguno de nuestros servicios?</p>
          <RouterLink to="/contacto" class="btn btn-primary">Contáctanos</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;600&display=swap');

.servicios {
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.services-section {
  background: #0a0a0a;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.service-card {
  background: #111;
  border: 1px solid #222;
  padding: 2rem;
  transition: all 0.3s ease;
}

.service-card:hover {
  border-color: #c44536;
  transform: translateY(-5px);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  color: #e8e8e8;
  margin: 0 0 1rem;
}

.service-description {
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
  color: #888;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-features li {
  font-family: 'Oswald', sans-serif;
  font-size: 0.85rem;
  color: #666;
  padding: 0.4rem 0;
  border-bottom: 1px solid #1a1a1a;
}

.service-features li:last-child {
  border-bottom: none;
}

.service-features li::before {
  content: '▸';
  color: #c44536;
  margin-right: 0.5rem;
}

.cta-section {
  text-align: center;
  padding: 3rem;
  background: #111;
  border: 1px solid #222;
}

.cta-section p {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 1.5rem;
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
}

.btn-primary {
  background: #c44536;
  color: #0a0a0a;
}

.btn-primary:hover {
  background: #e05545;
  box-shadow: 0 0 30px rgba(196, 69, 54, 0.5);
}
</style>
