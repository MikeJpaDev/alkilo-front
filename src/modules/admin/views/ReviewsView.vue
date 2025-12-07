<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Reseñas</h2>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Modera y administra todas las reseñas del sistema</p>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input v-model="filters.search" type="text" placeholder="Buscar por comentario..." class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
        <select v-model="filters.rating" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="">Todas las calificaciones</option>
          <option value="5">5 estrellas</option>
          <option value="4">4 estrellas</option>
          <option value="3">3 estrellas</option>
          <option value="2">2 estrellas</option>
          <option value="1">1 estrella</option>
        </select>
        <button @click="applyFilters" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors">
          Filtrar
        </button>
      </div>
    </div>

    <!-- Reviews Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div v-if="isLoading" class="col-span-2 text-center py-12 text-gray-500 dark:text-gray-400">
        Cargando reseñas...
      </div>
      <div v-else-if="!reviews?.data || reviews.data.length === 0" class="col-span-2 text-center py-12 text-gray-500 dark:text-gray-400">
        No se encontraron reseñas
      </div>
      <div v-else v-for="review in reviews.data" :key="review.id" class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <!-- User Info -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {{ review.user.firstName.charAt(0) }}{{ review.user.lastName.charAt(0) }}
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ review.user.firstName }} {{ review.user.lastName }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ new Date(review.createdAt).toLocaleDateString('es-ES') }}</p>
            </div>
          </div>

          <!-- Rating -->
          <div class="flex items-center gap-1">
            <svg v-for="n in 5" :key="n" :class="['w-5 h-5', n <= review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600']" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
        </div>

        <!-- Comment -->
        <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">{{ review.comment }}</p>

        <!-- Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <span class="text-xs text-gray-500 dark:text-gray-400">ID: {{ review.id }}</span>
          <div class="flex gap-2">
            <button @click="openViewModal(review)" class="px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
              Ver detalles
            </button>
            <button @click="handleDelete(review.id)" class="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="reviews?.meta" class="mt-6 flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Mostrando {{ ((reviews.meta.page - 1) * reviews.meta.limit) + 1 }} - {{ Math.min(reviews.meta.page * reviews.meta.limit, reviews.meta.total) }} de {{ reviews.meta.total }} reseñas
      </p>
      <div class="flex gap-2">
        <button @click="currentPage--" :disabled="currentPage === 1" :class="['px-4 py-2 rounded-lg font-medium transition-colors', currentPage > 1 ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed']">
          Anterior
        </button>
        <button @click="currentPage++" :disabled="currentPage >= reviews.meta.totalPages" :class="['px-4 py-2 rounded-lg font-medium transition-colors', currentPage < reviews.meta.totalPages ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed']">
          Siguiente
        </button>
      </div>
    </div>

    <!-- Details Modal -->
    <DetailsModal :is-open="isViewModalOpen" title="Detalles de la Reseña" @close="closeViewModal">
      <div v-if="selectedReview" class="space-y-4">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl">
            {{ selectedReview.user.firstName.charAt(0) }}{{ selectedReview.user.lastName.charAt(0) }}
          </div>
          <div>
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedReview.user.firstName }} {{ selectedReview.user.lastName }}</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ new Date(selectedReview.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Calificación</p>
          <div class="flex items-center gap-1">
            <svg v-for="n in 5" :key="n" :class="['w-6 h-6', n <= selectedReview.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600']" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span class="ml-2 text-lg font-semibold text-gray-900 dark:text-white">{{ selectedReview.rating }}/5</span>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Comentario</p>
          <p class="text-base text-gray-900 dark:text-white">{{ selectedReview.comment }}</p>
        </div>
        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p class="text-xs text-gray-500 dark:text-gray-400">ID de la reseña: {{ selectedReview.id }}</p>
        </div>
      </div>
    </DetailsModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getAllReviews, deleteReview } from '../actions';
import type { Review } from '@/modules/casas/interfaces/casas.interface';
import DetailsModal from '../components/DetailsModal.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const queryClient = useQueryClient();
const currentPage = ref(1);
const activeRating = ref<number | undefined>(undefined);
const filters = ref({
  search: '',
  rating: ''
});

const isViewModalOpen = ref(false);
const selectedReview = ref<Review | null>(null);

const { data: reviews, isLoading } = useQuery({
  queryKey: ['adminReviewsList', currentPage, activeRating],
  queryFn: () => getAllReviews(currentPage.value, 10, undefined, activeRating.value),
});

const deleteMutation = useMutation({
  mutationFn: deleteReview,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['adminReviewsList'] });
    toast.success('Reseña eliminada exitosamente');
  },
  onError: () => {
    toast.error('Error al eliminar la reseña');
  },
});

const openViewModal = (review: Review) => {
  selectedReview.value = review;
  isViewModalOpen.value = true;
};

const closeViewModal = () => {
  isViewModalOpen.value = false;
  selectedReview.value = null;
};

const handleDelete = async (id: number) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
    await deleteMutation.mutateAsync(id);
  }
};

const applyFilters = () => {
  currentPage.value = 1;
  activeRating.value = filters.value.rating ? Number(filters.value.rating) : undefined;
};
</script>
