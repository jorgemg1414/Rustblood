<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import logo from '../assets/logo.png'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <nav class="nav-left">
        <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span class="hamburger" :class="{ open: isMenuOpen }"></span>
        </button>
        <a class="nav-link" @click="toggleMenu" style="cursor: pointer;">Menu</a>
        <RouterLink to="/musica" class="nav-link" @click="closeMenu">Music</RouterLink>
      </nav>
      <RouterLink to="/" class="logo-link">
        <img :src="logo" alt="Rustblood" class="logo-img" />
      </RouterLink>
      <nav class="nav-right">
        <RouterLink to="/eventos" class="nav-link" @click="closeMenu">Events</RouterLink>
        <RouterLink to="/contacto" class="nav-link" @click="closeMenu">Contact</RouterLink>
      </nav>
    </div>
    <nav class="nav-mobile" :class="{ open: isMenuOpen }">
      <button class="close-menu" @click="closeMenu" aria-label="Close menu">
        <span class="close-icon">×</span>
      </button>
      <RouterLink to="/" class="menu-logo" @click="closeMenu">
        <img :src="logo" alt="Rustblood" class="menu-logo-img" />
      </RouterLink>
      <RouterLink to="/musica" class="nav-link" @click="closeMenu">Music</RouterLink>
      <RouterLink to="/videos" class="nav-link" @click="closeMenu">Videos</RouterLink>
      <RouterLink to="/blog" class="nav-link" @click="closeMenu">News</RouterLink>
      <RouterLink to="/galeria" class="nav-link" @click="closeMenu">Gallery</RouterLink>
      <RouterLink to="/miembros" class="nav-link" @click="closeMenu">Members</RouterLink>
      <RouterLink to="/eventos" class="nav-link" @click="closeMenu">Events</RouterLink>
      <RouterLink to="/contacto" class="nav-link" @click="closeMenu">Contact</RouterLink>
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
  height: 120px;
  background: transparent;
}

.menu-toggle {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 0.25rem;
  z-index: 101;
}

.menu-toggle:hover .hamburger {
  background: #c44536;
}

.hamburger {
  display: block;
  width: 18px;
  height: 2px;
  background: #888;
  position: relative;
  transition: background 0.3s ease;
}

.header-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: absolute;
  right: calc(50% + 60px + 1.5rem);
}

.nav-right {
  display: flex;
  gap: 1.5rem;
  position: absolute;
  left: calc(50% + 60px + 1.5rem);
}

.logo-link {
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.logo-img {
  height: 80px;
  width: auto;
  object-fit: contain;
}

.nav-link {
  font-family: 'Oswald', sans-serif;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
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
.nav-link.router-link-active::before {
  width: 100%;
  left: 0;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 2px;
  background: #888;
  left: 0;
  transition: transform 0.3s ease;
}

.hamburger::before {
  top: -6px;
}

.hamburger::after {
  top: 6px;
}

.hamburger.open {
  background: transparent;
}

.hamburger.open::before {
  transform: translateY(6px) rotate(45deg);
  background: #c44536;
}

.hamburger.open::after {
  transform: translateY(-6px) rotate(-45deg);
  background: #c44536;
}

.nav-mobile {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 0;
  visibility: hidden;
  z-index: 200;
  transform: scale(0.9);
}

.nav-mobile .nav-link {
  font-size: 1.2rem;
}

.nav-mobile::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(196, 69, 54, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.nav-mobile.open {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}

.close-menu {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}

.close-icon {
  font-size: 2rem;
  color: #888;
  transition: color 0.3s ease;
}

.close-icon:hover {
  color: #c44536;
}

.menu-logo {
  display: block;
  margin-bottom: 1.5rem;
}

.menu-logo-img {
  height: 70px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 20px rgba(196, 69, 54, 0.3));
}

@media (max-width: 768px) {
  .header {
    height: 80px;
  }

  .header-content {
    padding: 0.5rem 1rem;
    gap: 0;
    justify-content: space-between;
    position: relative;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-left {
    display: flex;
    position: static;
    align-items: center;
    gap: 0.5rem;
  }

  .nav-left .nav-link {
    display: none;
  }

  .nav-right {
    display: flex;
    position: static;
    gap: 0.5rem;
    align-items: center;
  }

  .nav-right .nav-link {
    display: none;
  }

  .logo-link {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .logo-img {
    height: 50px;
  }

  .nav-mobile {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 0;
    overflow-y: auto;
    padding: 5rem 2rem 3rem;
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: 0;
    visibility: hidden;
    z-index: 200;
    transform: scale(0.95);
  }

  .nav-mobile.open {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }

  .nav-mobile .menu-logo {
    margin-bottom: 1.5rem;
  }

  .nav-mobile .menu-logo-img {
    height: 50px;
  }

  .nav-mobile .nav-link {
    font-size: 1.1rem;
    padding: 0.75rem 0;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #1a1a1a;
  }

  .nav-mobile .nav-link:last-child {
    border-bottom: none;
  }
}

@media (min-width: 769px) {
  .nav-mobile .nav-link {
    font-size: 2rem;
  }
}
</style>