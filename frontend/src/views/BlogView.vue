<script setup lang="ts">
import { computed } from 'vue'
import { posts } from '../data/content'
import rtscene from '../assets/rtscene.jpg'

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const featuredPost = computed(() => posts[0])
const regularPosts = computed(() => posts.slice(1))
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

        <!-- Featured post -->
        <article v-if="featuredPost" class="post-card featured">
          <div class="featured-badge">Latest</div>
          <div class="post-content">
            <div class="post-meta">
              <span class="post-date">{{ formatDate(featuredPost.date) }}</span>
            </div>
            <h2 class="post-title">{{ featuredPost.title }}</h2>
            <p class="post-excerpt">{{ featuredPost.content }}</p>
            <span class="read-more">Read more <span class="arrow">→</span></span>
          </div>
        </article>

        <!-- Regular posts -->
        <div class="posts-list" v-if="regularPosts.length">
          <article
            v-for="post in regularPosts"
            :key="post.id"
            class="post-card"
          >
            <div class="post-content">
              <div class="post-meta">
                <span class="post-date">{{ formatDate(post.date) }}</span>
              </div>
              <h2 class="post-title">{{ post.title }}</h2>
              <p class="post-excerpt">{{ post.content }}</p>
              <span class="read-more">Read more <span class="arrow">→</span></span>
            </div>
          </article>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>

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
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.posts-section {
  background: #0a0a0a;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

/* Base card */
.post-card {
  background: #111;
  border: 1px solid #1e1e1e;
  border-left: 3px solid #c44536;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  cursor: pointer;
}

.post-card:hover {
  transform: translateX(6px);
  border-color: #c44536;
  box-shadow: 0 8px 30px rgba(196, 69, 54, 0.15);
}

/* Featured card overrides */
.post-card.featured {
  border-left-width: 4px;
  background: linear-gradient(135deg, #161616 0%, #111 60%);
  margin-bottom: 0;
}

.post-card.featured:hover {
  transform: translateX(8px);
  box-shadow: 0 12px 40px rgba(196, 69, 54, 0.2);
}

.post-card.featured .post-title {
  font-size: 2.4rem;
}

.featured-badge {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  font-family: 'Oswald', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c44536;
  background: rgba(196, 69, 54, 0.12);
  border: 1px solid rgba(196, 69, 54, 0.3);
  border-radius: 2px;
  padding: 0.2rem 0.6rem;
}

.post-content {
  padding: 2rem;
  padding-right: 7rem;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.post-date {
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.post-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.9rem;
  letter-spacing: 0.05em;
  color: #e8e8e8;
  margin: 0 0 0.75rem;
  transition: color 0.3s ease;
  line-height: 1.1;
}

.post-card:hover .post-title {
  color: #fff;
}

.post-excerpt {
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
  color: #666;
  line-height: 1.7;
  margin: 0 0 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  font-family: 'Oswald', sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: #c44536;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  opacity: 0.7;
  transition: opacity 0.2s ease, gap 0.2s ease;
}

.post-card:hover .read-more {
  opacity: 1;
}

.arrow {
  transition: transform 0.2s ease;
  display: inline-block;
}

.post-card:hover .arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .page-header { padding: 6rem 2rem 3rem; }
  .container { padding: 2rem 1rem; }

  .post-content {
    padding: 1.5rem;
    padding-right: 1.5rem;
  }

  .post-card.featured .post-title {
    font-size: 1.8rem;
  }

  .post-title {
    font-size: 1.5rem;
  }

  .featured-badge {
    position: static;
    display: inline-block;
    margin-bottom: 0.75rem;
  }

  .post-card:hover {
    transform: translateX(4px);
  }
}
</style>
