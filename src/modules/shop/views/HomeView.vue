<template>
  <!-- Title -->
  <div class="pt-32 bg-white dark:bg-gray-900 transition-colors">
    <h1 class="text-center text-2xl font-bold text-gray-800 dark:text-gray-100">
      {{ $t('Casas en') }}
    </h1>
  </div>

  <LoginActions v-if="isLogin" />
  <div v-if="isLogin" class="flex justify-center mt-6">
    <button @click="$router.push({ name: 'myCasas' })" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors">
      Mis Casas
    </button>
  </div>

  <FiltersSection
    :filters="filters"
    :provincias="provinciasList"
    :municipios="municipiosByProvincia"
  />

  <!-- component -->
  <div
    v-if="!casas"
    class="flex items-center justify-center min-h-screen p-5 bg-gray-100 dark:bg-gray-900 min-w-screen"
  >
    <div class="flex space-x-2 animate-pulse">
      <div class="w-3 h-3 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
      <div class="w-3 h-3 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
      <div class="w-3 h-3 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
    </div>
  </div>

  <CasasList v-else :casas="casas.data" />

  <BottonsPagination
    v-if="casas"
    :page="casas.meta.page"
    :has-next="casas.meta.hasNext"
    :has-prev="casas.meta.hasPrevious"
    :total="casas.meta.total"
    :total-pages="casas.meta.totalPages"
    :limit="casas.meta.limit"
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
import LoginActions from '@/modules/shop/components/LoginActions.vue';

const route = useRoute();
const page = ref(Number(route.query.page) || 1);

// Observar cambios en la query de la ruta
watch(
  () => route.query.page,
  (newPage) => {
    page.value = Number(newPage) || 1;
  },
  { immediate: true },
);

const { data: casas } = useQuery({
  queryKey: ['casas', page],
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

const isLogin = ref(localStorage.getItem('token'));
</script>
