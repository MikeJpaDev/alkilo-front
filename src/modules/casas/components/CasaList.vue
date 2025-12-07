<template>
  <!-- Casas List -->
  <section class="py-10 bg-gray-100 dark:bg-gray-900 transition-colors">
    <div
      class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <CasaCard v-for="casa in casas" :key="casa.id" :casa="casa" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Casa } from '../interfaces/casas.interface';
import CasaCard from './CasaCard.vue';

interface Props {
  casas: Casa[];
}

defineProps<Props>();
</script>
