import ShopLayoyts from '@/modules/shop/layouts/ShopLayoyts.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { authRouters } from '../modules/auth/router/index.ts';
import { adminRoutes } from '../modules/admin/router/index.ts';
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayoyts,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/modules/shop/views/HomeView.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/modules/shop/views/AboutView.vue'),
        },
        {
          path: '/services',
          name: 'services',
          component: () => import('@/modules/shop/views/ServicesView.vue'),
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('@/modules/shop/views/ContactView.vue'),
        },
        {
          path: '/testing',
          beforeEnter: [isAuthenticatedGuard],
          name: 'createCasa',
          component: () => import('@/modules/shop/views/CreateCasa.vue'),
        },
        {
          path: '/casas/:id',
          name: 'casaDetails',
          component: () => import('@/modules/casas/view/CasaDetails.vue'),
          props: true, // Permite pasar el parámetro `id` como prop
        },
      ],
    },
    authRouters,
    adminRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/modules/common/views/Page-404.vue'),
    },
  ],
});

export default router;
