<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  bgImage: string
}>()
</script>

<template>
  <section class="page-header">
    <div class="page-bg" :style="{ backgroundImage: `url(${bgImage})` }"></div>
    <h1 class="page-title reveal">{{ title }}</h1>
    <p v-if="subtitle" class="page-subtitle reveal reveal-delay-1">{{ subtitle }}</p>
  </section>
</template>

<style scoped>
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

@media (max-width: 768px) {
  .page-header {
    padding: 6rem 2rem 3rem;
  }
}
</style>
