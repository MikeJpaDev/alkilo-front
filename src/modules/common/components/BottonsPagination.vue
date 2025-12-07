<template>
  <div class="max-w-6xl mx-auto py-8 px-4">
    <div class="flex items-center justify-between">
      <!-- Botones de navegación a la izquierda -->
      <nav aria-label="Page navigation">
        <div class="flex gap-2">
          <button
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-all duration-200',
              canPrev
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow cursor-pointer dark:bg-blue-500 dark:hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-default dark:bg-gray-700 dark:text-gray-500'
            ]"
            :disabled="!canPrev"
            @click="goTo(props.page - 1)"
          >
            ← Anterior
          </button>

          <button
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-all duration-200',
              canNext
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow cursor-pointer dark:bg-blue-500 dark:hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-default dark:bg-gray-700 dark:text-gray-500'
            ]"
            :disabled="!canNext"
            @click="goTo(props.page + 1)"
          >
            Siguiente →
          </button>
        </div>
      </nav>

      <!-- Información de paginación a la derecha -->
      <div class="text-right text-gray-600 dark:text-gray-300">
        <p class="text-sm font-medium">
          {{ startItem }} - {{ endItem }} de {{ total }} resultados
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Página {{ page }} de {{ totalPages }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

interface Props {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  total: number;
  totalPages: number;
  limit: number;
}

const props = defineProps<Props>();
const router = useRouter();
const route = useRoute();

const canPrev = computed(() => !!props.hasPrev);
const canNext = computed(() => !!props.hasNext);

// Calcular el rango de items mostrados en la página actual
const startItem = computed(() => {
  return (props.page - 1) * props.limit + 1;
});

const endItem = computed(() => {
  return Math.min(props.page * props.limit, props.total);
});

function goTo(newPage: number) {
  const pageNum = Math.max(1, Math.floor(newPage));
  const query = { ...route.query, page: String(pageNum) };
  router.push({ query });
}
</script>
