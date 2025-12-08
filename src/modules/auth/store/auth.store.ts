import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { loginAction } from '../actions/login.action';
import { useLocalStorage } from '@vueuse/core';
import { registerAction } from '../actions/register.action';
import { getUserMe } from '../actions/get-user-me.action';
import { checkAuthAction } from '../actions/check-auth.actions';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Cheking);

  // Usar useLocalStorage directamente para que sea reactivo y persista
  const user = useLocalStorage<User | null>('user', null);
  const token = useLocalStorage<string>('token', '');
  const userToken = ref<User | null>(useLocalStorage<User | null>('userToken', null));

  const login = async (email: string, password: string) => {
    try {
      const loginResult = await loginAction(email, password);
      if (!loginResult.ok) {
        logout();
        return false;
      }

      user.value = loginResult.data;
      userToken.value = { ...loginResult.data };
      token.value = loginResult.token;
      authStatus.value = AuthStatus.Authenticated;
      console.log('store despues del login', localStorage.getItem('userToken'), token.value);
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
    console.log('Ejecutando logout');
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = null; // limpia y persiste en localStorage
    token.value = ''; // limpia y persiste en localStorage
    return false;
  };

  const fetchUserMe = async () => {
    try {
      const userData = await getUserMe();
      user.value = userData;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      return false;
    }
  };

  // Verifica el estado de autenticación al iniciar la app
  const checkAuthStatus = async (): Promise<boolean> => {
    // intentamos usar el token reactivo primero, si no está usar localStorage directamente
    const storedToken = token.value || (localStorage.getItem('token') ?? '');
    if (!storedToken) {
      logout();
      return false;
    }

    // aseguramos que el token reactivo esté poblado
    token.value = storedToken;

    // intentar obtener datos del usuario con el token
    const ok = await fetchUserMe();
    if (!ok) {
      logout();
      return false;
    }

    return true;
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
    fetchUserMe,
    checkAuthStatus,
  };
});
