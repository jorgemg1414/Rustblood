<script setup lang="ts">
import interface TourDate {
  date: string
  day: string
  month: string
  city: string
  venue: string
  ticketUrl: string
  soldOut?: boolean
}

const tourDates: TourDate[] = [
  { date: '15', day: 'SAB', month: 'MAR', city: 'Tepito, MX', venue: 'La Riviera', ticketUrl: '#' },
  { date: '05', day: 'SAB', month: 'ABR', city: 'Oaxaca, MX', venue: 'Bilbao BBK Live', ticketUrl: '#', soldOut: true },
]

const pastEvents = [
  { date: '10 ENE', city: 'Zaragoza, ES', venue: 'La Lata' },
  { date: '28 DIC', city: 'Vigo, ES', venue: 'Club Oui' },
]
</script>

<template>
  <div class="eventos">
    <section class="page-header">
      <h1 class="page-title">Events</h1>
      <p class="page-subtitle">2026</p>
    </section>

    <section class="tour-section">
      <div class="container">
        <h2 class="section-title">Upcoming Shows</h2>
        <div class="tour-list">
          <div v-for="show in tourDates" :key="show.date + show.city" class="tour-item">
            <div class="tour-date-box">
              <span class="date-num">{{ show.date }}</span>
              <span class="date-month">{{ show.month }}</span>
              <span class="date-day">{{ show.day }}</span>
            </div>
            <div class="tour-info">
              <span class="tour-city">{{ show.city }}</span>
              <span class="tour-venue">{{ show.venue }}</span>
            </div>
            <a v-if="!show.soldOut" :href="show.ticketUrl" class="btn btn-ticket">Tickets</a>
            <span v-else class="sold-out">Sold Out</span>
          </div>
        </div>
      </div>
    </section>

    <section class="past-section">
      <div class="container">
        <h2 class="section-title">Past Events</h2>
        <div class="past-list">
          <div v-for="event in pastEvents" :key="event.date + event.city" class="past-item">
            <span class="past-date">{{ event.date }}</span>
            <span class="past-city">{{ event.city }}</span>
            <span class="past-venue">{{ event.venue }}</span>
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
  padding-top: 80px;
}

.page-header {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, #0a0a0a 0%, #111 100%);
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

.tour-list {
  background: #111;
  border: 1px solid #222;
}

.tour-item {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #222;
  transition: background 0.3s ease;
}

.tour-item:last-child {
  border-bottom: none;
}

.tour-item:hover {
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

.past-section {
  background: linear-gradient(180deg, #0a0a0a 0%, #111 100%);
}

.past-list {
  max-width: 600px;
  margin: 0 auto;
}

.past-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #222;
  font-family: 'Oswald', sans-serif;
}

.past-date {
  color: #666;
  font-size: 0.9rem;
  min-width: 80px;
}

.past-city {
  color: #888;
  flex: 1;
  text-align: center;
}

.past-venue {
  color: #444;
  font-size: 0.9rem;
  text-align: right;
}

@media (max-width: 768px) {
  .tour-item {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .tour-date-box {
    margin-right: 0;
  }
}
</style>
