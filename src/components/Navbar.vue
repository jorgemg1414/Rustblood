<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logo from '../assets/logo.png'
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="logo-link">
      <img :src="logo" alt="Rustblood" class="logo-img" />
    </RouterLink>
    <nav class="nav">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/musica" class="nav-link">Music</RouterLink>
      <RouterLink to="/galeria" class="nav-link">Gallery</RouterLink>
      <RouterLink to="/miembros" class="nav-link">Members</RouterLink>
      <RouterLink to="/eventos" class="nav-link">Events</RouterLink>
      <RouterLink to="/contacto" class="nav-link">Contact</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.5rem 2rem;
  background: linear-gradient(to bottom, rgba(10,10,10,0.95), transparent);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  display: block;
}

.logo-img {
  height: 50px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 10px rgba(196, 69, 54, 0.5));
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  font-family: 'Oswald', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #888;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: #c44536;
  transition: width 0.3s ease, left 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #c44536;
}

.nav-link:hover::before,
.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: #c44536;
  width: 100%;
  left: 0;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-link {
    font-size: 0.8rem;
  }
}
</style>
