import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/components',
      children: [
        {
          path: 'buttons',
          name: 'buttons_presentation',
          component: () => import('../views/components/ButtonsPresentation.vue')
        },
        {
          path: 'containment',
          name: 'containment_presentation',
          component: () => import('../views/components/ContainmentPresentation.vue')
        }
      ]
    }
  ],
})

export default router
