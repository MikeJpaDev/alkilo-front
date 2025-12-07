<template>
  <div class="max-w-3xl mx-auto py-10">
    <h1 class="text-2xl font-semibold mb-6">Crear nueva Casa</h1>

    <form
      @submit.prevent="onSubmit"
      class="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
    >
      <div>
        <label class="block text-sm font-medium mb-1">Título</label>
        <input v-model="form.title" required type="text" class="w-full p-2 border rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Descripción</label>
        <textarea
          v-model="form.description"
          required
          rows="4"
          class="w-full p-2 border rounded"
        ></textarea>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Precio por noche</label>
          <input
            v-model.number="form.pricePerNight"
            required
            type="number"
            step="0.01"
            min="0"
            class="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Dormitorios</label>
          <input
            v-model.number="form.bedroomsCount"
            required
            type="number"
            min="0"
            class="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Baños</label>
          <input
            v-model.number="form.bathroomsCount"
            required
            type="number"
            min="0"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Capacidad (personas)</label>
          <input
            v-model.number="form.capacityPeople"
            required
            type="number"
            min="1"
            class="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Dirección</label>
          <input v-model="form.address" required type="text" class="w-full p-2 border rounded" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Municipio (ID)</label>
        <input
          v-model.number="form.municipalityId"
          required
          type="number"
          min="1"
          placeholder="Ej: 5"
          class="w-40 p-2 border rounded"
        />
        <p class="text-xs text-gray-500 mt-1">
          Si tienes la lista de municipios, cambia este campo por un select.
        </p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Contactos</label>
        <div v-for="(c, idx) in form.contacts" :key="idx" class="flex gap-2 items-center mb-2">
          <input v-model="c.name" placeholder="Nombre" class="flex-1 p-2 border rounded" />
          <input v-model="c.number" placeholder="Teléfono" class="w-40 p-2 border rounded" />
          <button
            type="button"
            @click="removeContact(idx)"
            class="px-3 py-1 bg-red-500 text-white rounded"
          >
            Eliminar
          </button>
        </div>

        <button type="button" @click="addContact" class="px-3 py-2 bg-blue-600 text-white rounded">
          Agregar contacto
        </button>
      </div>

      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-600">Revisa los campos antes de enviar.</div>
        <div class="flex gap-3">
          <button type="button" @click="resetForm" class="px-4 py-2 border rounded">Limpiar</button>
          <button
            type="submit"
            :disabled="submitting"
            class="px-4 py-2 bg-green-600 text-white rounded"
          >
            {{ submitting ? 'Enviando...' : 'Crear Casa' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { createCasa } from '@/modules/casas/actions/create-casa.action';
import type { Contact } from '@/modules/casas/interfaces/casas.interface';

const toast = useToast();
const router = useRouter();

const submitting = ref(false);

const form = reactive({
  title: '',
  description: '',
  pricePerNight: 0,
  bedroomsCount: 1,
  bathroomsCount: 1,
  capacityPeople: 1,
  address: '',
  municipalityId: 0 as number,
  contacts: [] as Contact[],
});

function addContact() {
  form.contacts.push({ id: 0, name: '', number: '' });
}

function removeContact(index: number) {
  form.contacts.splice(index, 1);
}

function resetForm() {
  form.title = '';
  form.description = '';
  form.pricePerNight = 0;
  form.bedroomsCount = 1;
  form.bathroomsCount = 1;
  form.capacityPeople = 1;
  form.address = '';
  form.municipalityId = 0;
  form.contacts = [];
}

async function onSubmit() {
  if (!form.title || !form.description || !form.address || !form.municipalityId) {
    toast.error('Completa los campos requeridos');
    return;
  }

  if (form.contacts.length === 0) {
    toast.error('Agrega al menos un contacto');
    return;
  }

  const payload = {
    title: form.title,
    description: form.description,
    pricePerNight: Number(form.pricePerNight),
    bedroomsCount: Number(form.bedroomsCount),
    bathroomsCount: Number(form.bathroomsCount),
    capacityPeople: Number(form.capacityPeople),
    address: form.address,
    municipalityId: Number(form.municipalityId),
    contacts: form.contacts.map((c) => ({ name: c.name, number: c.number })),
  };

  submitting.value = true;
  try {
    const created = await createCasa(payload);
    toast.success('Casa creada correctamente');
    // redirigir al detalle si la API devuelve id
    if ((created as any).id) {
      router.push({ path: `/casas/${(created as any).id}` });
    } else {
      router.push({ path: '/' });
    }
  } catch (err: any) {
    toast.error(err?.message || 'Error al crear la casa');
  } finally {
    submitting.value = false;
  }
}
</script>
