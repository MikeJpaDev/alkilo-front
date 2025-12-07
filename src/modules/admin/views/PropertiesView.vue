<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Propiedades</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Administra todas las propiedades del sistema</p>
      </div>
      <button @click="openCreateModal" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Nueva Propiedad
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input v-model="filters.search" type="text" placeholder="Buscar por título..." class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
        <select v-model="filters.province" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="">Todas las provincias</option>
        </select>
        <select v-model="filters.status" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="">Todos los estados</option>
          <option value="active">Activa</option>
          <option value="inactive">Inactiva</option>
          <option value="pending">Pendiente</option>
        </select>
        <button @click="applyFilters" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors">
          Filtrar
        </button>
      </div>
    </div>

    <!-- Properties Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Propiedad</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ubicación</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Precio/Noche</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Habitaciones</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Reseñas</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-if="isLoading">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                Cargando propiedades...
              </td>
            </tr>
            <tr v-else-if="!properties?.data || properties.data.length === 0">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No se encontraron propiedades
              </td>
            </tr>
            <tr v-else v-for="casa in properties.data" :key="casa.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img v-if="casa.imageUrls && casa.imageUrls.length > 0" :src="casa.imageUrls[0].url" :alt="casa.title" class="w-16 h-16 rounded-lg object-cover" />
                  <div v-else class="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ casa.title }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ casa.id.substring(0, 8) }}...</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                {{ casa.munipalityId.name }}, {{ casa.provinceId.name }}
              </td>
              <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                ${{ casa.pricePerNight }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                {{ casa.bedroomsCount }} hab. / {{ casa.bathroomsCount }} baños
              </td>
              <td class="px-6 py-4 text-sm">
                <div v-if="casa.averageRating !== null && casa.averageRating !== undefined" class="flex items-center gap-1">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span class="text-gray-900 dark:text-white font-medium">{{ casa.averageRating.toFixed(1) }}</span>
                  <span class="text-gray-500 dark:text-gray-400">({{ casa.reviewsCount || 0 }})</span>
                </div>
                <span v-else class="text-gray-500 dark:text-gray-400 text-sm">Sin reseñas</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button @click="openViewModal(casa)" title="Ver detalles" class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button @click="openEditModal(casa)" title="Editar" class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button @click="handleDelete(casa.id)" title="Eliminar" class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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

      <!-- Pagination -->
      <div v-if="properties?.meta" class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Mostrando {{ ((properties.meta.page - 1) * properties.meta.limit) + 1 }} - {{ Math.min(properties.meta.page * properties.meta.limit, properties.meta.total) }} de {{ properties.meta.total }} propiedades
          </p>
          <div class="flex gap-2">
            <button @click="currentPage--" :disabled="!properties.meta.hasPrevious" :class="['px-4 py-2 rounded-lg font-medium transition-colors', properties.meta.hasPrevious ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed']">
              Anterior
            </button>
            <button @click="currentPage++" :disabled="!properties.meta.hasNext" :class="['px-4 py-2 rounded-lg font-medium transition-colors', properties.meta.hasNext ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed']">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <PropertyModal
      :is-open="isPropertyModalOpen"
      :property="selectedProperty"
      @close="closePropertyModal"
      @submit="handlePropertySubmit"
    />

    <DetailsModal :is-open="isViewModalOpen" title="Detalles de la Propiedad" @close="closeViewModal">
      <div v-if="selectedProperty" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Título</p>
            <p class="text-base text-gray-900 dark:text-white">{{ selectedProperty.title }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Precio por noche</p>
            <p class="text-base text-gray-900 dark:text-white">${{ selectedProperty.pricePerNight }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Ubicación</p>
            <p class="text-base text-gray-900 dark:text-white">{{ selectedProperty.munipalityId.name }}, {{ selectedProperty.provinceId.name }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Dirección</p>
            <p class="text-base text-gray-900 dark:text-white">{{ selectedProperty.address }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Habitaciones</p>
            <p class="text-base text-gray-900 dark:text-white">{{ selectedProperty.bedroomsCount }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Baños</p>
            <p class="text-base text-gray-900 dark:text-white">{{ selectedProperty.bathroomsCount }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Capacidad</p>
            <p class="text-base text-gray-900 dark:text-white">{{ selectedProperty.capacityPeople }} personas</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Metros cuadrados</p>
            <p class="text-base text-gray-900 dark:text-white">{{ selectedProperty.metrosCuadrados || 'N/A' }} m²</p>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Descripción</p>
          <p class="text-base text-gray-900 dark:text-white">{{ selectedProperty.description }}</p>
        </div>
        <div v-if="selectedProperty.imageUrls && selectedProperty.imageUrls.length > 0">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Imágenes</p>
          <div class="grid grid-cols-3 gap-2">
            <img v-for="(img, idx) in selectedProperty.imageUrls" :key="idx" :src="img.url" :alt="`Imagen ${idx + 1}`" class="w-full h-24 object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </DetailsModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getAllProperties, deleteProperty, createProperty, updateProperty } from '../actions';
import type { Casa } from '@/modules/casas/interfaces/casas.interface';
import type { CreatePropertyData, UpdatePropertyData } from '../actions/create-property.action';
import PropertyModal from '../components/PropertyModal.vue';
import DetailsModal from '../components/DetailsModal.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const queryClient = useQueryClient();
const currentPage = ref(1);
const filters = ref({
  search: '',
  province: '',
  status: ''
});

const isPropertyModalOpen = ref(false);
const isViewModalOpen = ref(false);
const selectedProperty = ref<Casa | null>(null);

const { data: properties, isLoading } = useQuery({
  queryKey: ['adminPropertiesList', currentPage],
  queryFn: () => getAllProperties(currentPage.value, 10),
});

const deleteMutation = useMutation({
  mutationFn: deleteProperty,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['adminPropertiesList'] });
    toast.success('Propiedad eliminada exitosamente');
  },
  onError: () => {
    toast.error('Error al eliminar la propiedad');
  },
});

const createMutation = useMutation({
  mutationFn: createProperty,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['adminPropertiesList'] });
    toast.success('Propiedad creada exitosamente');
    closePropertyModal();
  },
  onError: () => {
    toast.error('Error al crear la propiedad');
  },
});

const updateMutation = useMutation({
  mutationFn: ({ id, data }: { id: string; data: UpdatePropertyData }) => updateProperty(id, data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['adminPropertiesList'] });
    toast.success('Propiedad actualizada exitosamente');
    closePropertyModal();
  },
  onError: () => {
    toast.error('Error al actualizar la propiedad');
  },
});

const openCreateModal = () => {
  selectedProperty.value = null;
  isPropertyModalOpen.value = true;
};

const openEditModal = (casa: Casa) => {
  selectedProperty.value = casa;
  isPropertyModalOpen.value = true;
};

const openViewModal = (casa: Casa) => {
  selectedProperty.value = casa;
  isViewModalOpen.value = true;
};

const closePropertyModal = () => {
  isPropertyModalOpen.value = false;
  selectedProperty.value = null;
};

const closeViewModal = () => {
  isViewModalOpen.value = false;
  selectedProperty.value = null;
};

const handlePropertySubmit = async (data: CreatePropertyData | UpdatePropertyData) => {
  if (selectedProperty.value) {
    await updateMutation.mutateAsync({ id: selectedProperty.value.id, data });
  } else {
    await createMutation.mutateAsync(data as CreatePropertyData);
  }
};

const handleDelete = async (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
    await deleteMutation.mutateAsync(id);
  }
};

const applyFilters = () => {
  // Implementar lógica de filtros
  console.log('Aplicando filtros:', filters.value);
};
</script>
