<!-- eslint-disable vue/no-mutating-props -->
<script setup>
defineProps({
  filters: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section
    class="py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors"
  >
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="flex flex-col md:flex-row gap-3">
        <!-- Ubicación -->
        <div class="flex-1 md:flex-[3]">
          <input
            v-model="filters.location"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Ubicación"
          />
        </div>

        <!-- Precio mínimo -->
        <div class="flex-1 md:flex-[2]">
          <div class="relative">
            <span
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium"
              >$</span
            >
            <input
              v-model="filters.minPrice"
              type="number"
              class="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 hover:border-gray-400 dark:hover:border-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Precio mín."
              min="0"
              step="1000"
            />
          </div>
        </div>

        <!-- Precio máximo -->
        <div class="flex-1 md:flex-[2]">
          <div class="relative">
            <span
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium"
              >$</span
            >
            <input
              v-model="filters.maxPrice"
              type="number"
              class="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 hover:border-gray-400 dark:hover:border-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Precio máx."
              min="0"
              step="1000"
            />
          </div>
        </div>

        <!-- Habitaciones -->
        <div class="flex-1 md:flex-[3]">
          <select
            v-model="filters.bedrooms"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 appearance-none"
          >
            <option value="">{{ $t('Habitaciones') }}</option>
            <option value="1">1 habitación</option>
            <option value="2">2 habitaciones</option>
            <option value="3">3 habitaciones</option>
            <option value="4">4+ habitaciones</option>
          </select>
        </div>

        <!-- Botón de búsqueda -->
        <div class="flex-1 md:flex-[2]">
          <button
            class="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
          >
            {{ $t('Buscar') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
