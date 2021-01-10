import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/overview',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'overview'
      },
      {
        path: 'overview',
        component: () => import('../views/overview.vue')
      },
      {
        path: 'pairing',
        component: () => import('../views/pair.vue')
      },
      {
        path: 'info',
        component: () => import('@/views/info.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
