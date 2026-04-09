import albumCover from '../assets/album.jpg'
import foto1 from '../assets/photos/rb1.jpg'
import foto2 from '../assets/photos/rb2.jpeg'
import foto3 from '../assets/photos/rb3.jpeg'
import foto4 from '../assets/photos/rb4.jpeg'

export const gallery = [
  { id: 1, title: 'Live Show 1', image: foto1 },
  { id: 2, title: 'Live Show 2', image: foto2 },
  { id: 3, title: 'Backstage', image: foto3 },
  { id: 4, title: 'Stage Performance', image: foto4 },
]

export const posts = [
  { id: 1, title: 'New Album Coming 2026', content: 'We are thrilled to announce our upcoming debut album "Dissolution Beyond" coming in 2026.', date: '2025-12-01' },
  { id: 2, title: 'Upcoming Tour Dates', content: 'We are excited to announce our upcoming tour dates across Mexico.', date: '2025-11-15' },
  { id: 3, title: 'Hoka Hey Festival', content: 'We are honored to be part of this year\'s Hoka Hey Festival.', date: '2025-10-01' }
]

export const albums = [
  { id: 1, title: 'Dissolution Beyond', year: 2026, cover: albumCover, description: 'Our first album, a deep exploration of human resilience.', tracks: ['Dissolution Beyond', 'In a Crypt', 'Hollow Throne', 'Freedom of Die', 'Hope Denied'], released: true }
]

export const videos = [{ id: 'cSLdIj_iwgI', title: 'RustBlood - Freedom of Die' }]

export const musicSocial = [
  { name: 'Spotify', url: 'https://open.spotify.com', icon: '🎵' },
  { name: 'YouTube', url: 'https://www.youtube.com/@Rustblood_band', icon: '▶️' }
]

export const contact = {
  email: 'booking@rustblood.com',
  phone: '+52 33 1234 5678',
  location: 'Tepatitlán, Jalisco, Mexico',
  social: [
    { name: 'Instagram', url: 'https://instagram.com/rustblood_band', icon: '📷' },
    { name: 'YouTube', url: 'https://youtube.com/@Rustblood_band', icon: '▶️' }
  ]
}

export const events = [
  { id: 1, date: '2026-03-15', venue: 'Salón Rojo', city: 'Guadalajara', time: '9:00 PM' },
  { id: 2, date: '2026-03-22', venue: 'El Depósito', city: 'Ciudad de México', time: '8:30 PM' }
]