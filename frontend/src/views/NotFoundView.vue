<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <p>Página no encontrada</p>
      <RouterLink to="/" class="home-link">Volver al inicio</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.content h1 {
  font-size: 6rem;
  font-weight: bold;
  margin: 0;
  color: #c44536;
}

.content p {
  font-size: 1.5rem;
  margin: 1rem 0 2rem;
  color: #666;
}

.home-link {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #c44536;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;
}

.home-link:hover {
  background: #e05545;
}
</style>
