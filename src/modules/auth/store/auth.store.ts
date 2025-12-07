import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { loginAction } from '../actions/login.action';
import { useLocalStorage } from '@vueuse/core';
import { registerAction } from '../actions/register.action';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Cheking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

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

  const register = async (
    firsrName: string,
    lastName: string,
    email: string,
    password: string,
    addres: string,
    ci: string,
  ) => {
    try {
      console.log('llegue hasta aqui registro', ci);
      const registerResp = await registerAction(firsrName, lastName, email, password, addres, ci);
      console.log('respuesta del registro', registerResp);
      if (!registerResp.ok) {
        logout();
        return false;
      }

      user.value = registerResp.data;
      token.value = registerResp.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.log(error);
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
    register,
  };
});
