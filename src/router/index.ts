import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/musica',
      name: 'musica',
      component: () => import('../views/MusicaView.vue')
    },
    {
      path: '/galeria',
      name: 'galeria',
      component: () => import('../views/GaleriaView.vue')
    },
    {
      path: '/miembros',
      name: 'miembros',
      component: () => import('../views/MiembrosView.vue')
    },
    {
      path: '/eventos',
      name: 'eventos',
      component: () => import('../views/EventosView.vue')
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: () => import('../views/ContactoView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    }
  ]
})

export default router
