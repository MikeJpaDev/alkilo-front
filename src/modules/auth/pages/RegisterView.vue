<template>
  <div class="w-full max-w-md mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Crear cuenta</h1>
      <p class="text-gray-600 dark:text-gray-400">Únete a Alkilo y encuentra tu hogar ideal</p>
    </div>

    <!-- Form -->
    <form @submit.prevent="onRegister" class="space-y-5">
      <!-- Name Input -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nombre completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Juan Pérez"
          autocomplete="name"
          v-model="formData.name"
        />
      </div>

      <!-- Email Input -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="tu@email.com"
          autocomplete="email"
          v-model="formData.email"
        />
      </div>

      <!-- Password Input -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="••••••••"
          autocomplete="new-password"
          v-model="formData.password"
        />
      </div>

      <!-- Confirm Password Input -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirmar contraseña
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="••••••••"
          autocomplete="new-password"
          v-model="formData.confirmPassword"
        />
      </div>

      <!-- Terms Checkbox -->
      <div class="flex items-start">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          required
          class="w-4 h-4 mt-1 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          v-model="formData.acceptTerms"
        />
        <label for="terms" class="ml-2 text-sm text-gray-600 dark:text-gray-400">
          Acepto los
          <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">términos y condiciones</a>
          y la
          <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">política de privacidad</a>
        </label>
      </div>

      <!-- Register Button -->
      <button
        type="submit"
        class="w-full bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 shadow-sm hover:shadow mt-2"
      >
        Crear cuenta
      </button>
    </form>

    <!-- Divider -->
    <div class="mt-8 mb-8">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">O regístrate con</span>
        </div>
      </div>
    </div>

    <!-- Social Register -->
    <div class="grid grid-cols-2 gap-4 mb-8">
      <button
        type="button"
        class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google
      </button>
      <button
        type="button"
        class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        Facebook
      </button>
    </div>

    <!-- Login Link -->
    <div class="text-center text-sm text-gray-600 dark:text-gray-400">
      ¿Ya tienes una cuenta?
      <RouterLink :to="{ name: 'login' }" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
        Inicia sesión aquí
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
});

const onRegister = async () => {
  if (formData.password !== formData.confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  // Aquí iría la lógica de registro
  console.log('Registrando usuario:', formData);
};
</script>
