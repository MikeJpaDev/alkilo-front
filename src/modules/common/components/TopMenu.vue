<template>
  <nav
    class="fixed top-0 left-0 z-20 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-2.5 px-6 sm:px-4 transition-colors duration-200"
  >
    <div class="container mx-auto flex max-w-7xl flex-wrap items-center justify-between">
      <a href="/" class="flex items-center">
        <span class="self-center whitespace-nowrap text-xl font-bold dark:text-white">Alkilo</span>
      </a>

      <!-- Desktop Menu - Centered -->
      <div class="hidden md:flex md:order-1 flex-1 justify-center">
        <ul class="flex flex-row space-x-1">
          <li>
            <RouterLink
              to="/"
              class="block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="
                isActive('/')
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
              "
            >
              Inicio
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/about"
              class="block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="
                isActive('/about')
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
              "
            >
              Nosotros
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/services"
              class="block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="
                isActive('/services')
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
              "
            >
              Servicios
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/contact"
              class="block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="
                isActive('/contact')
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
              "
            >
              Contacto
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="mt-2 sm:mt-0 sm:flex md:order-2 items-center gap-3">
        <!-- Theme Toggle Button -->
        <button
          @click="toggleTheme"
          type="button"
          class="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
          aria-label="Toggle theme"
          title="Cambiar tema"
        >
          <svg v-if="isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
        </button>

        <!-- Login Button -->
        <RouterLink to="/auth/login" v-if="!isLogin">
          <button
            type="button"
            class="hidden border-2 border-blue-600 dark:border-blue-500 py-2 px-5 text-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 md:inline-block rounded-lg transition-all duration-200"
          >
            Iniciar sesión
          </button>
        </RouterLink>
        <RouterLink to="/auth/register" v-if="!isLogin">
          <button
            type="button"
            class="rounded-lg bg-blue-600 dark:bg-blue-500 py-2 px-5 text-center text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 md:mr-0 transition-all duration-200 shadow-sm hover:shadow"
          >
            Registrarse
          </button>
        </RouterLink>
        <RouterLink to="/auth/register" v-if="isLogin">
          <button
            @click="logout"
            type="button"
            class="rounded-lg bg-blue-600 dark:bg-blue-500 py-2 px-5 text-center text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 md:mr-0 transition-all duration-200 shadow-sm hover:shadow"
          >
            Logout
          </button>
        </RouterLink>
        <!-- Mobile menu button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          :aria-expanded="mobileMenuOpen.toString()"
          aria-controls="mobile-menu"
          type="button"
          class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 md:hidden transition-colors"
          title="Abrir menú"
        >
          <span class="sr-only">Abrir menú</span>
          <svg
            v-if="!mobileMenuOpen"
            class="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg v-else class="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu (small screens) -->
    <div id="mobile-menu" v-show="mobileMenuOpen" class="md:hidden">
      <div class="px-3 pb-4 pt-2 space-y-1 sm:px-3">
        <RouterLink
          @click="mobileMenuOpen = false"
          to="/"
          class="block px-3 py-2 rounded-md text-base font-medium"
          :class="
            isActive('/')
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
          "
        >
          Inicio
        </RouterLink>

        <RouterLink
          @click="mobileMenuOpen = false"
          to="/about"
          class="block px-3 py-2 rounded-md text-base font-medium"
          :class="
            isActive('/about')
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
          "
        >
          Nosotros
        </RouterLink>

        <RouterLink
          @click="mobileMenuOpen = false"
          to="/services"
          class="block px-3 py-2 rounded-md text-base font-medium"
          :class="
            isActive('/services')
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
          "
        >
          Servicios
        </RouterLink>

        <RouterLink
          @click="mobileMenuOpen = false"
          to="/contact"
          class="block px-3 py-2 rounded-md text-base font-medium"
          :class="
            isActive('/contact')
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
          "
        >
          Contacto
        </RouterLink>

        <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
          <RouterLink
            @click="mobileMenuOpen = false"
            to="/auth/login"
            class="block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400"
            v-if="!isLogin"
            >Iniciar sesión</RouterLink
          >
          <button
            @click="logout"
            class="block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400"
            v-if="isLogin"
          >
            Logout
          </button>
          <RouterLink
            v-if="!isLogin"
            @click="mobileMenuOpen = false"
            to="/auth/register"
            class="mt-1 block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white"
            >Registrarse</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import { useAuthStore } from '@/modules/auth/store/auth.store';

console.log('aquiiiiiiiiiiiiii', ref(localStorage.getItem('user')));
const route = useRoute();
const { isDark, toggleTheme, initTheme } = useTheme();
const authStorage = useAuthStore();
const isActive = (path: string) => route.path === path;
const logout = async () => {
  await authStorage.logout();
  window.location.reload();
};

const mobileMenuOpen = ref(false);
const isLogin = ref(localStorage.getItem('token'));

// Close mobile menu on route change
watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false;
  },
);

onMounted(() => {
  initTheme();
});
</script>
