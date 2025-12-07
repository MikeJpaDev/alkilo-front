import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { loginAction } from '../actions/login.action';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Cheking);
  const user = ref<User | undefined>();
  const token = ref<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const loginResult = await loginAction(email, password);
      if (!loginResult.ok) {
        logout();
        return false;
      }

      console.log('que es esto pp dios', loginResult);

      user.value = loginResult.data;
      token.value = loginResult.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.log(error);
      return logout();
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = null;
    return false;
  };

  return {
    user,
    token,
    authStatus,

    //Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Cheking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isUnauthenticated: computed(() => authStatus.value === AuthStatus.Unauthenticated),

    //Actions
    login,
    logout,
  };
});
