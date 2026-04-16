<script setup lang="ts">
import { Mail, MapPin, Instagram, Youtube } from 'lucide-vue-next'
import rtscene from '../assets/rtscene.jpg'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'booking@rustblood.com', href: 'mailto:booking@rustblood.com' },
  { icon: MapPin, label: 'Location', value: 'Tepatitlán de Morelos, Jalisco, Mexico' }
]

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/rustblood_band', icon: Instagram },
  { name: 'YouTube', url: 'https://youtube.com/@Rustblood_band', icon: Youtube },
]
</script>

<template>
  <div class="contacto">
    <section class="page-header">
      <div class="page-bg" :style="{ backgroundImage: `url(${rtscene})` }"></div>
      <h1 class="page-title">Contact</h1>
      <p class="page-subtitle">Get in touch</p>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2 class="section-title">Information</h2>
            
            <div class="info-items">
              <div v-for="info in contactInfo" :key="info.label" class="info-item">
                <component :is="info.icon" class="info-icon" :size="24" />
                <div class="info-content">
                  <span class="info-label">{{ info.label }}</span>
                  <a v-if="info.href" :href="info.href" class="info-value">{{ info.value }}</a>
                  <span v-else class="info-value">{{ info.value }}</span>
                </div>
              </div>
            </div>

            <div class="social-section">
              <h3>Follow Us</h3>
              <div class="social-links">
                <a v-for="social in socialLinks" :key="social.name" :href="social.url" class="social-link" :aria-label="social.name">
                  <component :is="social.icon" :size="24" />
                </a>
              </div>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <h2 class="section-title">Contact Us</h2>
            <p class="contact-email">
              Send us an email at <a href="mailto:booking@rustblood.com">booking@rustblood.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;600&display=swap');

.contacto {
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
  position: relative;
  z-index: 1;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 10vw, 6rem);
  letter-spacing: 0.2em;
  color: #c44536;
  margin: 0;
}

.page-subtitle {
  position: relative;
  z-index: 1;
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  color: #666;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.contact-section {
  background: #0a0a0a;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
}

.section-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.8rem;
  letter-spacing: 0.15em;
  color: #c44536;
  margin-bottom: 2rem;
}

.info-items {
  margin-bottom: 3rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #222;
}

.info-icon {
  color: #c44536;
  flex-shrink: 0;
}

.info-content {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.info-value {
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  color: #e8e8e8;
}

.social-section h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: #666;
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-link:hover {
  color: #c44536;
  transform: scale(1.2);
}

.contact-form-wrapper {
  background: #111;
  border: 1px solid #222;
  padding: 2rem;
}

.contact-email {
  font-family: 'Oswald', sans-serif;
  color: #888;
  font-size: 1.1rem;
}

.contact-email a {
  color: #c44536;
  text-decoration: none;
}

.contact-email a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .page-header { padding: 6rem 2rem 3rem; }
  .contact-grid { grid-template-columns: 1fr; gap: 2rem; }
  .section-title { font-size: 1.5rem; }
  .info-item { padding: 0.75rem 0; }
  .social-link:active { color: #c44536; transform: scale(1.1); }
  .contact-email a:active { color: #e05545; }
}

@media (max-width: 480px) {
  .page-title { font-size: 3rem; }
  .contact-form-wrapper { padding: 1.5rem; }
  .info-value { font-size: 0.9rem; }
}
</style>
