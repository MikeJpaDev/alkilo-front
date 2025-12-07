<template>
  <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          <span v-if="loadingStats">...</span>
          <span v-else>{{ stats?.casas?.total || 0 }}</span>
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Total Propiedades</p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          <span v-if="loadingStats">...</span>
          <span v-else>{{ stats?.users?.active?.toLocaleString() || 0 }}</span>
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Usuarios Activos</p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          <span v-if="loadingStats">...</span>
          <span v-else>{{ stats?.reviews?.total || 0 }}</span>
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Total Reseñas</p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </div>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          <span v-if="loadingStats">...</span>
          <span v-else>{{ stats?.reviews?.averageRating?.toFixed(2) || '0.00' }}</span>
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Calificación Promedio</p>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reservas por Mes</h3>
        <div class="h-64 flex items-end justify-between gap-2">
          <div v-for="(value, index) in chartData" :key="index" class="flex-1 flex flex-col items-center gap-2">
            <div class="w-full bg-blue-600 dark:bg-blue-500 rounded-t-lg transition-all hover:bg-blue-700 dark:hover:bg-blue-600" :style="{ height: value + '%' }"></div>
            <span class="text-xs text-gray-600 dark:text-gray-400">{{ months[index] }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Actividad Reciente</h3>
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
            <div :class="['p-2 rounded-lg', activity.color]">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">{{ activity.description }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors overflow-hidden">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Propiedades Recientes</h3>
          <button class="text-sm text-blue-600 dark:text-blue-400 hover:underline">Ver todas</button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Propiedad</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ubicación</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Precio</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Estado</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-if="loadingProperties">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                Cargando propiedades...
              </td>
            </tr>
            <tr v-else-if="!properties || properties.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No hay propiedades disponibles
              </td>
            </tr>
            <tr v-else v-for="property in properties" :key="property.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <img v-if="property.imageUrl" :src="property.imageUrl" :alt="property.name" class="w-12 h-12 rounded-lg object-cover" />
                  <div v-else class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"></div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ property.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">ID: {{ property.id.substring(0, 8) }}...</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{{ property.location }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${{ property.price }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['px-2 py-1 text-xs font-semibold rounded-full', property.statusClass]">
                  {{ property.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <div class="flex items-center gap-2">
                  <button class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getAdminStats, getAllProperties } from '../actions';

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

// Consulta para obtener estadísticas del dashboard
const { data: stats, isLoading: loadingStats } = useQuery({
  queryKey: ['adminStats'],
  queryFn: getAdminStats,
});

// Consulta para obtener propiedades recientes
const { data: propertiesData, isLoading: loadingProperties } = useQuery({
  queryKey: ['adminProperties', 1, 5],
  queryFn: () => getAllProperties(1, 5),
});

// Mock data para el gráfico (esto puede venir del backend después)
const chartData = ref([45, 62, 38, 75, 58, 82, 67, 90, 55, 72, 48, 85]);

const recentActivity = ref([
  {
    id: 1,
    title: 'Nueva propiedad agregada',
    description: 'Casa moderna en Polanco agregada al sistema',
    time: 'Hace 5 minutos',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
  },
  {
    id: 2,
    title: 'Usuario registrado',
    description: 'Nuevo usuario: Juan Pérez se ha registrado',
    time: 'Hace 12 minutos',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
  },
  {
    id: 3,
    title: 'Reserva confirmada',
    description: 'Apartamento en Roma Norte - ID: #4521',
    time: 'Hace 1 hora',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
  },
  {
    id: 4,
    title: 'Pago recibido',
    description: 'Pago de $2,500 por reserva #3421',
    time: 'Hace 2 horas',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
  }
]);

// Computed para mapear las propiedades de la API al formato de la tabla
const properties = computed(() => {
  if (!propertiesData.value?.data) return [];

  return propertiesData.value.data.map(casa => ({
    id: casa.id,
    name: casa.title,
    location: `${casa.munipalityId.name}, ${casa.provinceId.name}`,
    price: casa.pricePerNight,
    status: 'Disponible', // Esto puede venir de la API si tienes un campo de status
    statusClass: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400',
    imageUrl: casa.imageUrls[0]?.url || null
  }));
});
</script>
