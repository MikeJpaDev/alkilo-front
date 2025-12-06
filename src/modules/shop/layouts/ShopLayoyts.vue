<template>
  <TopMenu />

  <router-view />

  <CustomFooter />
</template>

<script lang="ts" setup>
import TopMenu from '@/modules/common/components/TopMenu.vue';
import CustomFooter from '@/modules/shop/components/CustomFooter.vue';
</script>
