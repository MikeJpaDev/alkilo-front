import ShopLayoyts from '@/modules/shop/layouts/ShopLayoyts.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { authRouters } from '../modules/auth/router/index.ts';

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
          path: '/casas/:id',
          name: 'casaDetails',
          component: () => import('@/modules/casas/view/CasaDetails.vue'),
          props: true, // Permite pasar el parámetro `id` como prop
        },
      ],
    },
    authRouters,
  ],
});

export default router;
