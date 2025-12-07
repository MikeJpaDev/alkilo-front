<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
  <VueQueryDevtools />
</template>
