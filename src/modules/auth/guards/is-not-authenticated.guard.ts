import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { useAuthStore } from '../store/auth.store';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  await authStore.checkAuthStatus();

  if (authStore.authStatus === AuthStatus.Authenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
};

export default isNotAuthenticatedGuard;
