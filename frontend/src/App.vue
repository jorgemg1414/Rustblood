<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'

function onAfterLeave() {
  window.scrollTo({ top: 0, behavior: 'instant' })
}
</script>

<template>
  <Navbar />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in" @after-leave="onAfterLeave">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-name">Rustblood</span>
        <span class="footer-tagline">Progressive Death Metal · Tepatitlán, Jalisco</span>
      </div>
      <div class="footer-socials">
        <a href="https://instagram.com/rustblood_band" target="_blank" rel="noopener noreferrer" class="footer-social" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          Instagram
        </a>
        <a href="https://www.youtube.com/@Rustblood_band" target="_blank" rel="noopener noreferrer" class="footer-social" aria-label="YouTube">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
          YouTube
        </a>
      </div>
      <p class="footer-copy">&copy; 2026 Rustblood. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #050505;
  border-top: 1px solid #1a1a1a;
  padding: 2.5rem 2rem;
}

.footer-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.footer-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.6rem;
  letter-spacing: 0.2em;
  color: #c44536;
}

.footer-tagline {
  font-family: 'Oswald', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #333;
}

.footer-socials {
  display: flex;
  gap: 2rem;
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #555;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-social:hover {
  color: #c44536;
}

.footer-copy {
  font-family: 'Oswald', sans-serif;
  font-size: 0.75rem;
  color: #2a2a2a;
  margin: 0;
  letter-spacing: 0.05em;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
