<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex justify-center items-center transition-colors">
    <div class="w-full max-w-6xl mx-4 my-8 lg:my-0 grid lg:grid-cols-2 gap-8 lg:gap-0">
      <!-- Left: Branding & Image -->
      <div class="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 rounded-l-2xl p-12 text-white transition-colors">
        <div class="max-w-md text-center">
          <h1 class="text-5xl font-bold mb-6">Alkilo</h1>
          <p class="text-xl text-blue-100 mb-8">Tu hogar perfecto te está esperando</p>
          <div class="space-y-4 text-left">
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-blue-50">Miles de propiedades verificadas</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-blue-50">Proceso de alquiler simplificado</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-blue-50">Soporte 24/7 para ti</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl lg:rounded-l-none lg:rounded-r-2xl shadow-2xl p-8 md:p-12 transition-colors">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTheme } from '@/composables/useTheme';

const { initTheme } = useTheme();

onMounted(() => {
  initTheme();
});
</script>
