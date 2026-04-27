# Rustblood - Official Website

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anomalyco/rustblood-web)

Official website for **Rustblood**, a progressive death metal band from Tepatitlán de Morelos, Jalisco, Mexico.

## About the Band

Formed in January 2024, Rustblood blends the crudeness of death metal with progressive elements and melodic passages. Their influences include Death, Gojira, Opeth, and Dream Theater.

**Current Lineup:**
- **Edson Muñoz** - Guitar & Vocals
- **Joshua Giacomo** - Guitar
- **Lemmy Yeudhiel** - Bass
- **Alan Gómez** - Drums

## Tech Stack

- **Framework:** Vue 3 with Composition API (`<script setup>`)
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Scoped CSS with custom properties
- **Routing:** Vue Router 4
- **Icons:** lucide-vue-next
- **Deployment:** Vercel

## Features

- Responsive design optimized for all devices
- Smooth scroll reveal animations
- Interactive member profiles
- Photo gallery with lightbox
- Music discography section
- Embedded YouTube videos
- SEO optimized with meta tags

## Project Structure

```
rustblood-web/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable Vue components
│   │   ├── views/          # Page components
│   │   ├── router/         # Vue Router config
│   │   ├── data/           # Static content and data
│   │   ├── composables/    # Vue composables
│   │   └── assets/         # Images and media
│   └── package.json
├── package.json            # Root package config
├── vercel.json            # Vercel deployment config
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/anomalyco/rustblood-web.git
cd rustblood-web

# Install dependencies
npm install
cd frontend && npm install
```

### Development

```bash
# Start development server (from project root)
npm run dev

# Or from frontend directory
cd frontend
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
# Build for production (from project root)
npm run build

# Or from frontend directory
cd frontend
npm run build
```

## Deployment

This project is configured for seamless deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the Vue.js configuration
4. The site will be deployed with the settings in `vercel.json`

### Manual Deployment

```bash
npm install -g vercel
vercel
```

## Pages

- **/** - Home with hero section, about preview, featured music, and next show
- **/musica** - Discography with albums and embedded videos
- **/miembros** - Band member profiles with photos
- **/galeria** - Photo gallery with lightbox viewer
- **/eventos** - Upcoming shows and events
- **/videos** - Video collection
- **/contacto** - Contact information and social links
- **/blog** - News and updates

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## License

All rights reserved. This code is private and proprietary to Rustblood.

## Contact

- **Email:** booking@rustblood.com
- **Instagram:** [@rustblood_band](https://instagram.com/rustblood_band)
- **YouTube:** [@Rustblood_band](https://youtube.com/@Rustblood_band)

---

<p align="center">
  <strong>Rustblood</strong><br>
  Progressive Death Metal · Tepatitlán, Jalisco
</p>
