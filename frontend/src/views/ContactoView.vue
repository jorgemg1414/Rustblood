<script setup lang="ts">
import { ref } from 'vue'
import { messagesApi } from '../api'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitted = ref(false)
const loading = ref(false)
const error = ref('')

const submitForm = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await messagesApi.create({
      name: form.value.name,
      email: form.value.email,
      subject: form.value.subject,
      message: form.value.message
    })
    
    submitted.value = true
    form.value = { name: '', email: '', subject: '', message: '' }
    setTimeout(() => {
      submitted.value = false
    }, 5000)
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'booking@rustblood.com' },
  { icon: '📱', label: 'Phone', value: '+123 456 7890' },
  { icon: '📍', label: 'Location', value: 'Tepatitlán de Morelos, Jalisco, Mexico' }
]

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/rustblood_band/', icon: '📷' },
  { name: 'YouTube', url: 'https://www.youtube.com/@Rustblood_band', icon: '▶️' },
  { name: 'Spotify', url: '#', icon: '🎵' },
]
</script>

<template>
  <div class="contacto">
    <section class="page-header">
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
                <span class="info-icon">{{ info.icon }}</span>
                <div class="info-content">
                  <span class="info-label">{{ info.label }}</span>
                  <span class="info-value">{{ info.value }}</span>
                </div>
              </div>
            </div>

            <div class="social-section">
              <h3>Follow Us</h3>
              <div class="social-links">
                <a v-for="social in socialLinks" :key="social.name" :href="social.url" class="social-link">
                  {{ social.icon }}
                </a>
              </div>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <h2 class="section-title">Message</h2>
            
            <form v-if="!submitted" @submit.prevent="submitForm" class="contact-form">
              <div class="form-group">
                <label for="name">Name</label>
                <input v-model="form.name" type="text" id="name" required />
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input v-model="form.email" type="email" id="email" required />
              </div>
              
              <div class="form-group">
                <label for="subject">Subject</label>
                <select v-model="form.subject" id="subject" required>
                  <option value="">Select...</option>
                  <option value="booking">Booking</option>
                  <option value="press">Press</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="message">Message</label>
                <textarea v-model="form.message" id="message" rows="5" required></textarea>
              </div>
              
              <p v-if="error" class="error">{{ error }}</p>
              
              <button type="submit" class="btn btn-primary" :disabled="loading">
                {{ loading ? 'Sending...' : 'Send' }}
              </button>
            </form>

            <div v-else class="success-message">
              <span class="success-icon">✓</span>
              <h3>Message Sent!</h3>
              <p>Thank you for contacting us. We'll get back to you soon.</p>
            </div>
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
  font-size: 1.5rem;
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
  font-size: 1.5rem;
  color: #666;
  transition: all 0.3s ease;
  text-decoration: none;
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

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-family: 'Oswald', sans-serif;
  font-size: 0.85rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  background: #0a0a0a;
  border: 1px solid #333;
  color: #e8e8e8;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #c44536;
}

.form-group select {
  cursor: pointer;
}

.form-group textarea {
  resize: vertical;
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
  width: 100%;
}

.btn-primary:hover {
  background: #e05545;
  box-shadow: 0 0 30px rgba(196, 69, 54, 0.5);
}

.success-message {
  text-align: center;
  padding: 3rem 1rem;
}

.success-icon {
  display: inline-block;
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 2rem;
  background: #c44536;
  color: #0a0a0a;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.success-message h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.5rem;
  color: #e8e8e8;
  margin: 0 0 0.5rem;
}

.success-message p {
  font-family: 'Oswald', sans-serif;
  color: #666;
}

.error {
  color: #c44536;
  font-family: 'Oswald', sans-serif;
  margin-bottom: 1rem;
}

.btn:disabled {
  background: #666;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
