<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { useAuthStore } from './modules/auth/store/auth.store';
import { AuthStatus } from './modules/auth/interfaces/auth-status.enum';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

authStore.$subscribe(
  (_, state) => {
    console.log('State del status', state.authStatus);
    if (state.authStatus === AuthStatus.Cheking) {
      authStore.checkAuthStatus();
      return;
    }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' });
      return;
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <RouterView />
  <VueQueryDevtools />
</template>
