import foto1 from '../assets/photos/rb1.jpg'
import foto2 from '../assets/photos/rb2.jpeg'
import foto3 from '../assets/photos/rb3.jpeg'
import foto4 from '../assets/photos/rb4.jpeg'
import foto5 from '../assets/photos/rb5.jpeg'
import foto6 from '../assets/photos/rb6.jpeg'
import foto7 from '../assets/photos/rb7.jpeg'
import foto8 from '../assets/photos/rb8.jpeg'
import foto9 from '../assets/photos/rb9.jpeg'
import foto10 from '../assets/photos/rb10.jpeg'
import albumCover from '../assets/album.jpg'
import { Music, Headphones, Play, Guitar } from 'lucide-vue-next'

export const gallery = [
  { id: 1, title: 'Live Show 1', image: foto1 },
  { id: 2, title: 'Live Show 2', image: foto2 },
  { id: 3, title: 'Backstage', image: foto3 },
  { id: 4, title: 'Stage Performance', image: foto4 },
  { id: 5, title: 'Live Show 5', image: foto5 },
  { id: 6, title: 'Live Show 6', image: foto6 },
  { id: 7, title: 'Live Show 7', image: foto7 },
  { id: 8, title: 'Live Show 8', image: foto8 },
  { id: 9, title: 'Live Show 9', image: foto9 },
  { id: 10, title: 'Live Show 10', image: foto10 },
]

export const posts = [
  { id: 1, title: 'New Album Coming 2026', content: 'We are thrilled to announce our upcoming debut album "Dissolution Beyond" coming in 2026.', date: '2025-12-01' },
  { id: 2, title: 'Upcoming Tour Dates', content: 'We are excited to announce our upcoming tour dates across Mexico.', date: '2025-11-15' },
  { id: 3, title: 'Hoka Hey Festival', content: 'We are honored to be part of this year\'s Hoka Hey Festival.', date: '2025-10-01' }
]

export const albums = [
  {
    title: 'Dissolution Beyond',
    year: 2026,
    cover: albumCover,
    description: 'Our first album, a deep exploration of human resilience.',
    tracks: ['Dissolution Beyond', 'In a crypt', 'Hollow Throne', 'Freedom of Die', 'Hope Denied'],
    released: true
  }
]

export const videos = [
  { id: 'cSLdIj_iwgI', title: 'RustBlood - Freedom of Die (Hoka Hey 2025)' }
]

export const socialLinks = [
  { name: 'Spotify', url: '#', icon: Music },
  { name: 'Apple Music', url: '#', icon: Headphones },
  { name: 'YouTube', url: 'https://www.youtube.com/@Rustblood_band', icon: Play },
  { name: 'Bandcamp', url: '#', icon: Guitar }
]

