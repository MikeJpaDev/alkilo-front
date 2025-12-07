<template>
  <div class="mb-6">
    <p class="font-semibold text-gray-800 dark:text-gray-200">
      {{ contact.name }}
    </p>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        ></path>
      </svg>
      {{ contact.number }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { Contact } from '../interfaces/casas.interface';

interface Props {
  contact: Contact;
}

defineProps<Props>();
</script>
