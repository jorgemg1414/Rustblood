<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <a href="https://instagram.com/rustblood_band" target="_blank" rel="noopener" class="footer-social">Instagram</a>
        <a href="https://www.youtube.com/@Rustblood_band" target="_blank" rel="noopener" class="footer-social">YouTube</a>
      </div>
      <p>&copy; 2026 Rustblood. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #050505;
  border-top: 1px solid #1a1a1a;
  padding: 2rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-social {
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #555;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-social:hover {
  color: #c44536;
}

.footer p {
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  color: #333;
  margin: 0;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
