<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import lemmy from '../assets/members/lemmy.jpg'
import alan from '../assets/members/alan.jpg'
import joshua from '../assets/members/joshua.jpg'
import edson from '../assets/members/edson.jpg'
import exmiembro from '../assets/members/exmiembro.jpg'
import rtscene from '../assets/rtscene.jpg'

interface Member {
  id: string
  name: string
  instrument: string
  photo: string
  isFormer?: boolean
}

const members: Member[] = [
  { id: 'edson', name: 'Edson Muñoz', instrument: 'Guitar & Vocals', photo: edson },
  { id: 'joshua', name: 'Joshua Giacomo', instrument: 'Guitar', photo: joshua },
  { id: 'lemmy', name: 'Lemmy Yeudhiel', instrument: 'Bass', photo: lemmy },
  { id: 'alan', name: 'Alan Gómez', instrument: 'Drums', photo: alan }
]

const formerMember: Member = {
  id: 'jorge-martin',
  name: 'Jorge Martin',
  instrument: 'Guitar',
  photo: exmiembro,
  isFormer: true
}

const showFormerMember = ref(false)
const titleClickCount = ref(0)

const handleTitleClick = () => {
  titleClickCount.value++
  if (titleClickCount.value >= 5) {
    showFormerMember.value = true
  }
}

onMounted(() => {

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<template>
  <div class="miembros">
    <section class="page-header">
      <div class="page-bg" :style="{ backgroundImage: `url(${rtscene})` }"></div>
      <h1 class="title reveal" @click="handleTitleClick">Members</h1>
    </section>
    <div class="container">
      <div class="members-grid">
        <RouterLink
          v-for="(member, index) in members"
          :key="index"
          :to="`/miembros/${member.id}`"
          class="member-card reveal"
          :class="`reveal-delay-${index + 1}`"
        >
          <div class="photo-wrapper">
            <img :src="member.photo" :alt="member.name" class="member-photo" loading="lazy" />
          </div>
          <h2 class="member-name">{{ member.name }}</h2>
          <p class="member-instrument">{{ member.instrument }}</p>
        </RouterLink>
      </div>

      <Transition name="former">
        <div v-if="showFormerMember" class="former-section">
          <h2 class="section-title">Former Members</h2>
          <div class="members-grid">
            <div class="member-card former-member">
              <div class="photo-wrapper">
                <img :src="formerMember.photo" :alt="formerMember.name" class="member-photo" />
              </div>
              <h2 class="member-name">{{ formerMember.name }}</h2>
              <p class="member-instrument">{{ formerMember.instrument }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.miembros {
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

.title {
  position: relative;
  z-index: 1;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  letter-spacing: 0.2em;
  color: #c44536;
  text-align: center;
  margin: 0 0 3rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.section-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.5rem;
  letter-spacing: 0.15em;
  color: #666;
  text-align: center;
  margin: 4rem 0 2rem;
}

.former-member {
  opacity: 0.7;
}

.former-member .member-photo {
  filter: grayscale(100%);
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.member-card {
  text-align: center;
  max-width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  display: block;
}

.member-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(196, 69, 54, 0.2);
}

.photo-wrapper {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  background: #1a1a1a;
}

.member-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.5s ease;
}

.member-card:hover .member-photo {
  transform: scale(1.05);
  filter: grayscale(30%);
}

.member-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  letter-spacing: 0.1em;
  color: #e8e8e8;
  margin: 0 0 0.5rem;
}

.member-instrument {
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  color: #c44536;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.former-section {
  margin-top: 4rem;
  border-top: 1px solid #1a1a1a;
  padding-top: 3rem;
}

.former-enter-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.former-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .page-header { padding: 6rem 2rem 3rem; }
  .container { padding: 0 1rem; }
  .title { font-size: 3rem; margin-bottom: 2rem; }
  .section-title { font-size: 2rem; margin-top: 3rem; }
  .members-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .member-card { max-width: 100%; }
  .photo-wrapper { margin-bottom: 1rem; }
  .member-name { font-size: 1.5rem; }
  .member-instrument { font-size: 0.8rem; }
}

@media (max-width: 480px) {
  .members-grid { grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .title { font-size: 2.5rem; }
}
</style>
