export const adminRoutes = {
  path: '/admin',
  name: 'admin',
  component: () => import('../layouts/AdminLayout.vue'),
  meta: { requiresAuth: true, requiresAdmin: true },
  children: [
    {
      path: '',
      redirect: '/admin/dashboard'
    },
    {
      path: 'dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: 'properties',
      name: 'admin-properties',
      component: () => import('../views/PropertiesView.vue'),
    },
    {
      path: 'users',
      name: 'admin-users',
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: 'reviews',
      name: 'admin-reviews',
      component: () => import('../views/ReviewsView.vue'),
    },
  ],
};
