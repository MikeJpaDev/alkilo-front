<template>
  <!-- Title -->
  <div class="pt-32 bg-white">
    <h1 class="text-center text-2xl font-bold text-gray-800">Casas en Alkilo</h1>
  </div>

  <!-- Tab Menu -->
  <div
    class="flex flex-wrap items-center overflow-x-auto overflow-y-hidden py-10 justify-center bg-white text-gray-800"
  >
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>Architecto</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 rounded-t-lg text-gray-900"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      <span>Corrupti</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        ></polygon>
      </svg>
      <span>Excepturi</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
      </svg>
      <span>Consectetur</span>
    </a>
  </div>

  <FiltersSection
    :filters="filters"
    :provincias="provinciasList"
    :municipios="municipiosByProvincia"
  />

  <!-- component -->
  <div
    v-if="!casas"
    class="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen"
  >
    <div class="flex space-x-2 animate-pulse">
      <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
      <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
      <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
    </div>
  </div>

  <CasasList v-else :casas="casas.data" />

  <BottonsPagination
    v-if="casas"
    :page="casas.meta.page"
    :has-next="casas.meta.hasNext"
    :has-prev="casas.meta.hasPrevious"
  />
</template>

<script lang="ts" setup>
import FiltersSection from '@/modules/casas/components/FiltersSection.vue';
import { useQuery } from '@tanstack/vue-query';
import { getCasasActions } from '../../casas/actions';
import CasasList from '@/modules/casas/components/CasaList.vue';
import BottonsPagination from '@/modules/common/components/BottonsPagination.vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();
const page = ref(Number(route.query.page) || 1);

const { data: casas, isLoading } = useQuery({
  queryKey: ['casas', { page: page.value }],
  queryFn: () => getCasasActions(page.value),
  staleTime: 1000 * 60 * 5, //5 minutos de refresco
});
// Datos de ejemplo
const provinciasList = ref([
  { id: 1, name: 'La Habana' },
  { id: 2, name: 'Pinar del Río' },
  { id: 3, name: 'Matanzas' },
]);

const municipiosByProvincia = ref({
  1: [
    { id: 1, name: 'Plaza de la Revolución' },
    { id: 2, name: 'Centro Habana' },
    { id: 3, name: 'Habana Vieja' },
  ],
  2: [
    { id: 4, name: 'Pinar del Río' },
    { id: 5, name: 'Viñales' },
    { id: 6, name: 'San Luis' },
  ],
  3: [
    { id: 7, name: 'Matanzas' },
    { id: 8, name: 'Varadero' },
    { id: 9, name: 'Cárdenas' },
  ],
});
const filters = ref({
  location: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
});

watch(
  () => route.query.page?.valueOf,
  (newPage) => {
    page.value = Number(newPage) || 1;
    console.log('Page changed to:', page.value);
  },
  { immediate: true },
);
</script>
