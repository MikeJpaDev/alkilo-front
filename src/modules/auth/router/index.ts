import type { RouteRecordRaw } from 'vue-router';

export const authRouters: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  redirect: '/auth/login',
  component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/modules/auth/pages/LoginView.vue'),
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('@/modules/auth/pages/RegisterView.vue'),
    },
  ],
};
