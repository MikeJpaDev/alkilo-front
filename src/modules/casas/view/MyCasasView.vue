<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold mb-6">Mis Casas</h2>
    <div v-if="isLoading" class="text-center py-8">Cargando...</div>
    <div v-else>
      <div v-if="casas.length === 0" class="text-gray-500">No has creado ninguna casa.</div>
      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="casa in casas" :key="casa.id" class="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h3 class="text-lg font-semibold mb-2">{{ casa.title }}</h3>
          <p class="text-gray-600 mb-2">{{ casa.description }}</p>
          <p class="text-blue-600 font-bold mb-2">{{ casa.pricePerNight }}€ / noche</p>
          <p class="text-sm text-gray-500 mb-2">{{ casa.address }}</p>
          <div class="flex gap-2 mt-4">
            <button @click="verDetalles(casa.id)" class="bg-blue-500 text-white px-3 py-1 rounded">Ver</button>
            <button @click="editarCasa(casa.id)" class="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
            <button @click="borrarCasa(casa.id)" class="bg-red-500 text-white px-3 py-1 rounded">Borrar</button>
          </div>
        </div>
      </div>
      <div class="mt-8 flex justify-center gap-2">
        <button @click="prevPage" :disabled="page === 1" class="px-3 py-1 rounded bg-gray-200">Anterior</button>
        <span>Página {{ page }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page === totalPages" class="px-3 py-1 rounded bg-gray-200">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getMyCasas } from '../actions/get-my-casas.action';
import { deleteCasa } from '../actions/delete-casa.action';

const router = useRouter();
const casas = ref([]);
const isLoading = ref(true);
const page = ref(1);
const totalPages = ref(1);

const fetchCasas = async () => {
  isLoading.value = true;
  try {
    const res = await getMyCasas(page.value, 10);
    casas.value = res.data;
    totalPages.value = res.meta.totalPages;
  } finally {
    isLoading.value = false;
  }
};

const verDetalles = (id: string) => {
  router.push({ name: 'casa-details', params: { id } });
};

const editarCasa = (id: string) => {
  router.push({ name: 'casa-edit', params: { id } });
};

const borrarCasa = async (id: string) => {
  if (confirm('¿Estás seguro de que deseas borrar esta casa? Esta acción no se puede deshacer.')) {
    try {
      await deleteCasa(id);
      await fetchCasas();
    } catch (e) {
      alert('Error al borrar la casa.');
    }
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchCasas();
  }
};
const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    fetchCasas();
  }
};

onMounted(fetchCasas);
</script>
