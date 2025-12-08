<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold mb-6">Editar Casa</h2>
    <div v-if="isLoading" class="text-center py-8">Cargando...</div>
    <form v-else @submit.prevent="submit" class="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <div class="mb-4">
        <label class="block mb-1 font-medium">Título</label>
        <input v-model="form.title" type="text" class="w-full border rounded px-3 py-2" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Descripción</label>
        <textarea v-model="form.description" class="w-full border rounded px-3 py-2" required></textarea>
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Precio por noche (€)</label>
        <input v-model="form.pricePerNight" type="number" class="w-full border rounded px-3 py-2" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Habitaciones</label>
        <input v-model="form.bedroomsCount" type="number" class="w-full border rounded px-3 py-2" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Baños</label>
        <input v-model="form.bathroomsCount" type="number" class="w-full border rounded px-3 py-2" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Capacidad de personas</label>
        <input v-model="form.capacityPeople" type="number" class="w-full border rounded px-3 py-2" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Dirección</label>
        <input v-model="form.address" type="text" class="w-full border rounded px-3 py-2" required />
      </div>
      <button type="submit" :disabled="loading" class="bg-blue-600 text-white px-6 py-2 rounded">
        <span v-if="loading">Guardando...</span>
        <span v-else>Guardar cambios</span>
      </button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      <p v-if="success" class="text-green-600 mt-2">¡Casa actualizada correctamente!</p>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCasaActions } from '../actions/get-casa.actions';
import { editCasa } from '../actions/edit-casa.action';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const isLoading = ref(true);
const loading = ref(false);
const error = ref('');
const success = ref(false);
const form = ref({
  title: '',
  description: '',
  pricePerNight: '',
  bedroomsCount: 1,
  bathroomsCount: 1,
  capacityPeople: 1,
  address: '',
});

const fetchCasa = async () => {
  isLoading.value = true;
  try {
    const casa = await getCasaActions(id);
    form.value = {
      title: casa.title,
      description: casa.description,
      pricePerNight: casa.pricePerNight,
      bedroomsCount: casa.bedroomsCount,
      bathroomsCount: casa.bathroomsCount,
      capacityPeople: casa.capacityPeople,
      address: casa.address,
    };
  } catch (e) {
    error.value = 'Error al cargar la casa.';
  } finally {
    isLoading.value = false;
  }
};

const submit = async () => {
  loading.value = true;
  error.value = '';
  success.value = false;
  try {
    await editCasa(id, form.value);
    success.value = true;
    setTimeout(() => router.push({ name: 'myCasas' }), 1200);
  } catch (e) {
    error.value = 'Error al actualizar la casa.';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCasa);
</script>
