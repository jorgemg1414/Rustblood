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
    <p>&copy; 2026 Rustblood. Todos los derechos reservados.</p>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: 2rem;
  background: #050505;
  border-top: 1px solid #1a1a1a;
}

.footer p {
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  color: #444;
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
