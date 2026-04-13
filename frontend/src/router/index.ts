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
      path: '/videos',
      name: 'videos',
      component: () => import('../views/VideosView.vue')
    },
    {
      path: '/galeria',
      name: 'galeria',
      component: () => import('../views/GaleriaView.vue')
    },
    {
      path: '/miembros/:name',
      name: 'miembro-detalle',
      component: () => import('../views/MiembroDetailView.vue')
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
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/404',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'catch-all',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
