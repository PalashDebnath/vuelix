import { createRouter, createWebHistory } from 'vue-router'

import ShowView from '../views/show-view.vue';

const routes = [
  {
    path: '/',
    redirect: '/shows'
  },
  {
    path: '/shows',
    component: ShowView
  },
  {
    path: '/shows/:id',
    component: () => import('../views/show-detail.vue')
  },
  {
    path: '/:notFound(.*)',
    component: () => import('../views/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'active'
})

export default router
