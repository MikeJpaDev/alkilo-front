<template>
  <nav class="fixed top-0 left-0 z-20 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-2.5 px-6 sm:px-4 transition-colors duration-200">
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
              :class="isActive('/')
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'"
            >
              Inicio
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/about"
              class="block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="isActive('/about')
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'"
            >
              Nosotros
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/services"
              class="block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="isActive('/services')
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'"
            >
              Servicios
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/contact"
              class="block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="isActive('/contact')
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'"
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
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
        </button>

        <!-- Login Button -->
        <RouterLink to="/auth/login">
          <button
            type="button"
            class="hidden border-2 border-blue-600 dark:border-blue-500 py-2 px-5 text-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 md:inline-block rounded-lg transition-all duration-200"
          >
            Iniciar sesión
          </button>
        </RouterLink>
        <RouterLink to="/auth/register">
          <button
            type="button"
            class="rounded-lg bg-blue-600 dark:bg-blue-500 py-2 px-5 text-center text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 md:mr-0 transition-all duration-200 shadow-sm hover:shadow"
          >
            Registrarse
          </button>
        </RouterLink>
        <!-- Mobile menu button -->
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 md:hidden transition-colors"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Abrir menú</span>
          <svg
            class="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

    </div>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTheme } from '@/composables/useTheme';

const route = useRoute();
const { isDark, toggleTheme, initTheme } = useTheme();

const isActive = (path: string) => route.path === path;

onMounted(() => {
  initTheme();
});
</script>
