<script setup lang="ts">
import { onMounted } from 'vue'
import rtscene from '../assets/rtscene.jpg'
import tepaMetalFest from '../assets/photos/tepa-metal-fest.jpg'

interface TourDate {
  date: string
  day: string
  month: string
  city: string
  venue: string
  address: string
  ticketUrl: string
  flyer?: string
}

const tourDates: TourDate[] = [
  {
    date: '07',
    day: 'SAB',
    month: 'NOV',
    city: 'Tepatitlán, Jalisco',
    venue: 'Terraza Alameda',
    address: 'Av. Ricardo Alcalá #69',
    ticketUrl: 'https://www.ticketopolis.com/tepametalfest/',
    flyer: tepaMetalFest,
  },
]

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
  <div class="eventos">
    <section class="page-header">
      <div class="page-bg" :style="{ backgroundImage: `url(${rtscene})` }"></div>
      <h1 class="page-title reveal">Events</h1>
      <p class="page-subtitle reveal reveal-delay-1">2026</p>
    </section>

    <section class="tour-section">
      <div class="container">
        <h2 class="section-title reveal">Upcoming Shows</h2>
        <div class="events-grid">
          <div v-for="(show, index) in tourDates" :key="show.date + show.city" class="event-card reveal" :class="`reveal-delay-${index + 1}`">
            <div v-if="show.flyer" class="event-flyer">
              <img :src="show.flyer" :alt="`${show.city} - ${show.venue}`" />
            </div>
            <div class="event-body">
              <div class="tour-date-box">
                <span class="date-num">{{ show.date }}</span>
                <span class="date-month">{{ show.month }}</span>
                <span class="date-day">{{ show.day }}</span>
              </div>
              <div class="tour-info">
                <span class="tour-city">{{ show.city }}</span>
                <span class="tour-venue">{{ show.venue }}</span>
                <span class="tour-address">{{ show.address }}</span>
              </div>
              <a :href="show.ticketUrl" class="btn btn-ticket" target="_blank" rel="noopener noreferrer">Tickets</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;600&display=swap');

.eventos {
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
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.section-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  letter-spacing: 0.15em;
  color: #c44536;
  margin-bottom: 2rem;
  text-align: center;
}

.tour-section {
  background: #0a0a0a;
}

.events-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.event-card {
  background: #111;
  border: 1px solid #222;
  overflow: hidden;
}

.event-flyer {
  width: 100%;
}

.event-flyer img {
  width: 100%;
  height: auto;
  display: block;
}

.event-body {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  gap: 2rem;
  transition: background 0.3s ease;
}

.event-card:hover .event-body {
  background: #1a1a1a;
}

.tour-date-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  margin-right: 2rem;
}

.date-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  color: #c44536;
  line-height: 1;
}

.date-month {
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.date-day {
  font-family: 'Oswald', sans-serif;
  font-size: 0.7rem;
  color: #444;
  letter-spacing: 0.1em;
}

.tour-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tour-city {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #e8e8e8;
}

.tour-venue {
  color: #666;
  font-size: 0.9rem;
}

.tour-address {
  color: #444;
  font-size: 0.8rem;
}

.btn-ticket {
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  padding: 0.6rem 1.5rem;
  background: #c44536;
  color: #0a0a0a;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-ticket:hover {
  background: #e05545;
  box-shadow: 0 0 20px rgba(196, 69, 54, 0.4);
}

.sold-out {
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  padding: 0.6rem 1.5rem;
  border: 1px solid #333;
  color: #444;
}


@media (max-width: 768px) {
  .page-header { padding: 6rem 2rem 3rem; }
  .container { padding: 2rem 1rem; }
  
  .event-body {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem 1rem;
  }

  .tour-date-box { margin-right: 0; }
}

@media (max-width: 480px) {
  .page-title { font-size: 2.5rem; }
  .section-title { font-size: 1.5rem; }
  .tour-city { font-size: 1rem; }
  .btn-ticket, .sold-out { padding: 0.5rem 1rem; font-size: 0.7rem; }
}
</style>
