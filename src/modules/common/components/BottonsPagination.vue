<template>
  <div class="max-w-2xl mx-auto flex items-center justify-center py-8">
    <nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px">
        <button
          class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :disabled="!canPrev"
          @click="goTo(props.page - 1)"
        >
          Previous
        </button>

        <button
          class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :disabled="!canNext"
          @click="goTo(props.page + 1)"
        >
          Next
        </button>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

interface Props {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const props = defineProps<Props>();
const router = useRouter();
const route = useRoute();

const canPrev = computed(() => !!props.hasPrev);
const canNext = computed(() => !!props.hasNext);

function goTo(newPage: number) {
  const pageNum = Math.max(1, Math.floor(newPage));
  const query = { ...route.query, page: String(pageNum) };
  router.push({ query });
}
</script>
