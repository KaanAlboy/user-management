import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'

import 'vue-router'
import FormView from '@/views/FormView.vue'

interface breadcrumb {
  name: string
  link?: string
}

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumbs?: breadcrumb[]
    showInModal?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/create',
      name: 'create',
      component: FormView,
      meta: {
        breadcrumbs: [{ name: 'Home', link: '/' }, { name: 'Create' }]
      }
    },
    {
      path: '/create/:id',
      name: 'edit',
      component: FormView,
      meta: {
        breadcrumbs: [{ name: 'Home', link: '/' }, { name: 'Edit' }]
      }
    },
    {
      path: '/',
      name: 'home',
      component: UsersView,
      meta: {
        breadcrumbs: [{ name: 'Home', link: '/' }]
      },
      children: [
        {
          path: '/create',
          name: 'create-user-modal',
          component: FormView,
          meta: {
            showInModal: true
          }
        },
        {
          path: '/create/:id',
          name: 'update-user-modal',
          component: FormView,
          meta: {
            showInModal: true
          }
        }
      ]
    }
  ]
})

export default router
