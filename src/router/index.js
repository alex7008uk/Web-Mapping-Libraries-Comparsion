import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      path: '/comparsion',
      name: 'comparsion',
      component: () => import('@/views/ComparsionPage.vue'),
    },
  ],
})

export default router
