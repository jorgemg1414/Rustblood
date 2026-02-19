<script setup lang="ts">
import lemmy from '../assets/members/lemmy.jpg'
import alan from '../assets/members/alan.jpg'
import joshua from '../assets/members/joshua.jpg'
import edson from '../assets/members/edson.jpg'

interface Member {
  name: string
  instrument: string
  photo: string
}

const members: Member[] = [
  { name: 'Edson Muñoz', instrument: 'Guitarra y Voz', photo: edson },
  { name: 'Joshua Giacomo', instrument: 'Guitarra', photo: joshua },
  { name: 'Lemmy Yeudhiel', instrument: 'Bajo', photo: lemmy },
  { name: 'Alan Gómez', instrument: 'Batería', photo: alan }
]
</script>

<template>
  <div class="miembros">
    <div class="container">
      <h1 class="title">Miembros</h1>
      
      <div class="members-grid">
        <div 
          v-for="(member, index) in members" 
          :key="index" 
          class="member-card"
        >
          <div class="photo-wrapper">
            <img :src="member.photo" :alt="member.name" class="member-photo" />
          </div>
          <h2 class="member-name">{{ member.name }}</h2>
          <p class="member-instrument">{{ member.instrument }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.miembros {
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  letter-spacing: 0.2em;
  color: #c44536;
  text-align: center;
  margin: 0 0 3rem;
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

@media (max-width: 768px) {
  .title {
    font-size: 3rem;
  }
  
  .members-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
