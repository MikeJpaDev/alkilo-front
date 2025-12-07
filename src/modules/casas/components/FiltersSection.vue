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
  <section class="py-4 bg-gray-50 border-b border-gray-200 mx-40">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row gap-3">
        <!-- Ubicación -->
        <div class="flex-1 md:flex-[3]">
          <input
            v-model="filters.location"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            placeholder="Ubicación"
          />
        </div>

        <!-- Precio mínimo -->
        <div class="flex-1 md:flex-[2]">
          <input
            v-model="filters.minPrice"
            type="number"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            placeholder="Precio mín."
            min="0"
          />
        </div>

        <!-- Precio máximo -->
        <div class="flex-1 md:flex-[2]">
          <input
            v-model="filters.maxPrice"
            type="number"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            placeholder="Precio máx."
            min="0"
          />
        </div>

        <!-- Habitaciones -->
        <div class="flex-1 md:flex-[3]">
          <select
            v-model="filters.bedrooms"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white appearance-none"
          >
            <option value="">Habitaciones</option>
            <option value="1">1 habitación</option>
            <option value="2">2 habitaciones</option>
            <option value="3">3 habitaciones</option>
            <option value="4">4+ habitaciones</option>
          </select>
        </div>

        <!-- Botón de búsqueda -->
        <div class="flex-1 md:flex-[2]">
          <button
            class="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
