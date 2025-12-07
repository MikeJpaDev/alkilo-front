<template>
  <div :key="themeKey" class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
    <TopMenu />

    <router-view />

    <CustomFooter />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import TopMenu from '@/modules/common/components/TopMenu.vue';
import CustomFooter from '@/modules/shop/components/CustomFooter.vue';
import { useTheme } from '@/composables/useTheme';

const { isDark } = useTheme();
const themeKey = computed(() => isDark.value ? 'dark' : 'light');
</script>
