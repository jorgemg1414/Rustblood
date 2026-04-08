<script setup lang="ts">
import { posts } from '../data/content'
import rtscene from '../assets/rtscene.jpg'

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="blog">
    <section class="page-header">
      <div class="page-bg" :style="{ backgroundImage: `url(${rtscene})` }"></div>
      <h1 class="page-title">News</h1>
      <p class="page-subtitle">Latest updates</p>
    </section>

    <section class="posts-section">
      <div class="container">
        <div class="posts-list">
          <article 
            v-for="post in posts" 
            :key="post.id" 
            class="post-card"
          >
            <div class="post-content">
              <span class="post-date">{{ formatDate(post.date) }}</span>
              <h2 class="post-title">{{ post.title }}</h2>
              <p class="post-excerpt">{{ post.content }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;600&display=swap');

.blog {
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
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.posts-section {
  background: #0a0a0a;
}

.loading, .empty, .error {
  text-align: center;
  color: #666;
  font-family: 'Oswald', sans-serif;
  padding: 4rem;
}

.error {
  color: #c44536;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.post-card {
  background: #111;
  border: 1px solid #222;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  border-color: #c44536;
  box-shadow: 0 20px 40px rgba(196, 69, 54, 0.15);
}

.post-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.post-card:hover .post-image img {
  transform: scale(1.05);
}

.post-content {
  padding: 2rem;
}

.post-date {
  font-family: 'Oswald', sans-serif;
  font-size: 0.85rem;
  color: #c44536;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.post-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  letter-spacing: 0.05em;
  color: #e8e8e8;
  margin: 0.5rem 0 1rem;
}

.post-excerpt {
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
  color: #888;
  line-height: 1.7;
  margin: 0;
}

@media (max-width: 768px) {
  .page-header { padding: 6rem 2rem 3rem; }
  .container { padding: 2rem 1rem; }
  
  .post-image {
    height: 200px;
  }
  
  .post-content {
    padding: 1.5rem;
  }
  
  .post-title {
    font-size: 1.5rem;
  }

  .post-card:active {
    transform: translateY(-2px);
    border-color: #c44536;
  }
}
</style>
