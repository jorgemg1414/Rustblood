<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import lemmy from '../assets/members/lemmy.jpg'
import alan from '../assets/members/alan.jpg'
import joshua from '../assets/members/joshua.jpg'
import edson from '../assets/members/edson.jpg'
import exmiembro from '../assets/members/exmiembro.jpg'
import rtscene from '../assets/rtscene.jpg'
import { Instagram, Twitter, Facebook, Mail } from 'lucide-vue-next'

interface Member {
  id: string
  name: string
  instrument: string
  photo: string
  photos?: string[]
  bio: string
  influences: string[]
  socials?: {
    instagram?: string
    twitter?: string
    facebook?: string
    email?: string
  }
  isFormer?: boolean
}

const members: Member[] = [
  {
    id: 'edson',
    name: 'Edson Muñoz',
    instrument: 'Guitar & Vocals',
    photo: edson,
    bio: '',
    influences: [],
    socials: {
      instagram: 'https://www.instagram.com/edsontm_/'
    }
  },
  {
    id: 'joshua',
    name: 'Joshua Giacomo',
    instrument: 'Guitar',
    photo: joshua,
    bio: '',
    influences: [],
    socials: {
      instagram: 'https://www.instagram.com/joshua_rustblood/'
    }
  },
  {
    id: 'lemmy',
    name: 'Lemmy Yeudhiel',
    instrument: 'Bass',
    photo: lemmy,
    bio: '',
    influences: [],
    socials: {
      instagram: 'https://www.instagram.com/vnm_lmtr/'
    }
  },
  {
    id: 'alan',
    name: 'Alan Gómez',
    instrument: 'Drums',
    photo: alan,
    bio: '',
    influences: [],
    socials: {
      instagram: 'https://www.instagram.com/alan_gomez_drums/'
    }
  },
  {
    id: 'jorge-martin',
    name: 'Jorge Martin',
    instrument: 'Guitar',
    photo: exmiembro,
    bio: '',
    influences: [],
    isFormer: true
  }
]

const route = useRoute()
const router = useRouter()
const memberId = route.params.name as string

const member = computed(() => {
  const id = memberId?.toLowerCase()
  const found = members.find(m => m.id === id)
  if (found) return found
  const fallback = members.find(m => m.name.toLowerCase().replace(/ /g, '-').replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u') === id)
  return fallback || null
})

onMounted(() => {
  window.scrollTo(0, 0)
  if (!member.value) {
    router.replace('/404')
  }
})
</script>

<template>
  <div class="member-detail">
    <section class="page-header">
      <div class="page-bg" :style="{ backgroundImage: `url(${rtscene})` }"></div>
      <RouterLink to="/miembros" class="back-link">&larr; Back to Members</RouterLink>
      <h1 class="title reveal">{{ member?.name }}</h1>
      <p class="instrument reveal">{{ member?.instrument }}</p>
    </section>

    <section class="content-section">
      <div class="container">
        <div class="profile-section">
          <div class="main-photo">
            <img :src="member?.photo" :alt="member?.name" />
          </div>
          
          <div class="info-panel">
            <h2>Biography</h2>
            <p class="bio">{{ member?.bio || 'Coming soon...' }}</p>
          </div>
        </div>

        <div class="socials-section">
          <h2>Social Networks</h2>
          <div class="socials-list">
            <a v-if="member?.socials?.instagram" :href="member.socials.instagram" class="social-btn" target="_blank">
              <Instagram :size="20" /> Instagram
            </a>
            <a v-if="member?.socials?.twitter" :href="member.socials.twitter" class="social-btn" target="_blank">
              <Twitter :size="20" /> Twitter/X
            </a>
            <a v-if="member?.socials?.facebook" :href="member.socials.facebook" class="social-btn" target="_blank">
              <Facebook :size="20" /> Facebook
            </a>
            <a v-if="member?.socials?.email" :href="`mailto:${member.socials.email}`" class="social-btn">
              <Mail :size="20" /> Email
            </a>
            <p v-if="!member?.socials?.instagram && !member?.socials?.twitter && !member?.socials?.facebook && !member?.socials?.email" class="empty">
              Coming soon...
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;600&display=swap');

.member-detail {
  min-height: 100vh;
  padding-bottom: 4rem;
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

.back-link {
  position: relative;
  z-index: 10;
  color: #888;
  text-decoration: none;
  font-family: 'Oswald', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  transition: color 0.3s ease;
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #444;
  border-radius: 4px;
}

.back-link:hover {
  color: #c44536;
  border-color: #c44536;
}

.title {
  position: relative;
  z-index: 1;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 10vw, 5rem);
  letter-spacing: 0.15em;
  color: #c44536;
  margin: 0;
}

.instrument {
  position: relative;
  z-index: 1;
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  color: #888;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.content-section {
  background: linear-gradient(180deg, rgba(17,17,17,0.95) 0%, rgba(10,10,10,0.98) 100%);
  padding: 4rem 0;
  min-height: 50vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.profile-section {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.main-photo {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  background: #1a1a1a;
  border: 1px solid #333;
}

.main-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-panel h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.8rem;
  letter-spacing: 0.1em;
  color: #c44536;
  margin-bottom: 1rem;
}

.bio {
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #aaa;
  margin-bottom: 2rem;
}

.extra-photos h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 0.9rem;
  color: #666;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
}

.photos-grid img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 4px;
}

.influences-section h2,
.socials-section h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.8rem;
  letter-spacing: 0.1em;
  color: #c44536;
  margin-bottom: 1.5rem;
}

.influences-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.influence-tag {
  font-family: 'Oswald', sans-serif;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 4px;
  color: #aaa;
}

.socials-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Oswald', sans-serif;
  font-size: 0.9rem;
  padding: 0.6rem 1.2rem;
  background: transparent;
  border: 1px solid #333;
  color: #888;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-btn:hover {
  border-color: #c44536;
  color: #c44536;
}

.empty {
  font-family: 'Oswald', sans-serif;
  color: #444;
  font-style: italic;
}

@media (max-width: 768px) {
  .profile-section {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .main-photo {
    max-width: 300px;
    margin: 0 auto;
  }
  
  .title {
    font-size: 2.5rem;
  }
  
  .instrument {
    font-size: 1rem;
  }
}
</style>