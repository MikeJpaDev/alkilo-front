<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <!-- Backdrop -->
          <div class="fixed inset-0 transition-opacity bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75" @click="handleClose"></div>

          <!-- Modal -->
          <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
            <form @submit.prevent="handleSubmit">
              <!-- Header -->
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ isEditing ? 'Editar Propiedad' : 'Nueva Propiedad' }}
                </h3>
              </div>

              <!-- Body -->
              <div class="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título *</label>
                    <input v-model="form.title" type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción *</label>
                    <textarea v-model="form.description" required rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio por noche *</label>
                    <div class="relative">
                      <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">$</span>
                      <input v-model.number="form.pricePerNight" type="number" required min="0" class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Habitaciones *</label>
                    <input v-model.number="form.bedroomsCount" type="number" required min="1" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Baños *</label>
                    <input v-model.number="form.bathroomsCount" type="number" required min="1" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacidad (personas) *</label>
                    <input v-model.number="form.capacityPeople" type="number" required min="1" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  </div>

                  <div v-if="!isEditing">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Provincia *</label>
                    <select v-model.number="form.provinceId" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                      <option value="" disabled>Selecciona una provincia</option>
                      <option v-for="province in provinces" :key="province.id" :value="province.id">
                        {{ province.name }}
                      </option>
                    </select>
                  </div>

                  <div v-if="!isEditing">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Municipio *</label>
                    <select v-model.number="form.municipalityId" required :disabled="!form.provinceId || isLoadingMunicipalities" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed">
                      <option value="" disabled>
                        {{ isLoadingMunicipalities ? 'Cargando...' : 'Selecciona un municipio' }}
                      </option>
                      <option v-for="municipality in municipalities" :key="municipality.id" :value="municipality.id">
                        {{ municipality.name }}
                      </option>
                    </select>
                  </div>

                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dirección *</label>
                    <input v-model="form.address" type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <!-- Subida de imágenes solo en edición -->
                  <div class="md:col-span-2" v-if="isEditing && props.property">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Imágenes</label>
                    <label class="inline-block">
                      <span class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer font-medium">Seleccionar</span>
                      <input ref="imageInputRef" type="file" multiple accept="image/*" @change="onImageChange" class="hidden" />
                    </label>
                    <button v-if="selectedImageNames.length" type="button" @click="clearImageSelection" class="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">Quitar selección</button>
                    <div v-if="selectedImageNames.length" class="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      <span class="font-medium">Seleccionadas:</span>
                      <ul class="list-disc list-inside">
                        <li v-for="name in selectedImageNames" :key="name">{{ name }}</li>
                      </ul>
                    </div>
                    <div class="flex flex-wrap gap-2 mt-2">
                      <div v-for="img in props.property.imageUrls" :key="img.url" class="relative group">
                        <img :src="img.url" class="w-20 h-20 object-cover rounded" />
                        <button
                          type="button"
                          class="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition"
                          :disabled="deletingImage === img.fileName"
                          @click="handleDeleteImage(img.fileName)"
                          title="Eliminar imagen"
                        >
                          <span v-if="deletingImage === img.fileName">...</span>
                          <span v-else>✕</span>
                        </button>
                      </div>
                    </div>
                  </div>


                  <!-- Contacts Section -->
                  <div class="md:col-span-2" v-if="!isEditing">
                    <div class="flex items-center justify-between mb-2">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Contactos *</label>
                      <button type="button" @click="addContact" class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        + Agregar contacto
                      </button>
                    </div>
                    <div v-if="form.contacts.length === 0" class="text-sm text-gray-500 dark:text-gray-400 italic">
                      Debe agregar al menos un contacto
                    </div>
                    <div v-for="(contact, index) in form.contacts" :key="index" class="flex gap-2 mb-2">
                      <input v-model="contact.name" type="text" required placeholder="Nombre" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                      <input v-model="contact.number" type="tel" required placeholder="+5352123456" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                      <button type="button" @click="removeContact(index)" class="px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <button type="button" @click="handleClose" class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Cancelar
                </button>
                <button type="submit" :disabled="isSubmitting" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors">
                  {{ isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import type { Casa } from '@/modules/casas/interfaces/casas.interface';
import { getProvinces, getMunicipalitiesByProvince, type Province, type Municipality, type Contact } from '@/modules/admin/actions';
import { uploadPropertyImage } from '../actions/upload-property-image.action';
import { deletePropertyImage } from '../actions/delete-property-image.action';

interface PropertyFormData {
  title: string;
  description: string;
  pricePerNight: number;
  bedroomsCount: number;
  bathroomsCount: number;
  capacityPeople: number;
  address: string;
  municipalityId: number;
  provinceId: number; // Solo para el UI, no se envía a la API
  contacts: Contact[];
}

const props = defineProps<{
  isOpen: boolean;
  property?: Casa | null;
}>();

const emit = defineEmits<{
  close: [];
  submit: [data: Omit<PropertyFormData, 'provinceId'>]; // Omitimos provinceId al emitir
}>();

const isSubmitting = ref(false);
const isEditing = ref(false);

const form = ref<PropertyFormData>({
  title: '',
  description: '',
  pricePerNight: 0,
  bedroomsCount: 1,
  bathroomsCount: 1,
  capacityPeople: 1,
  address: '',
  municipalityId: 0,
  provinceId: 0,
  contacts: [],
});

// Fetch provinces
const { data: provincesData } = useQuery({
  queryKey: ['provinces'],
  queryFn: () => getProvinces(1, 20),
});

const provinces = computed(() => provincesData.value?.data || []);

// Fetch municipalities when provinceId changes
const { data: municipalitiesData, isLoading: isLoadingMunicipalities } = useQuery({
  queryKey: ['municipalities', form.value.provinceId],
  queryFn: () => getMunicipalitiesByProvince(form.value.provinceId),
  enabled: computed(() => form.value.provinceId > 0),
});

const municipalities = computed(() => municipalitiesData.value?.municipalities || []);

// Reset municipality when province changes
watch(() => form.value.provinceId, (newProvinceId, oldProvinceId) => {
  if (newProvinceId !== oldProvinceId && !isEditing.value) {
    form.value.municipalityId = 0;
  }
});

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    pricePerNight: 0,
    bedroomsCount: 1,
    bathroomsCount: 1,
    capacityPeople: 1,
    address: '',
    municipalityId: 0,
    provinceId: 0,
    contacts: [],
  };
};

const addContact = () => {
  form.value.contacts.push({ name: '', number: '' });
};

const removeContact = (index: number) => {
  form.value.contacts.splice(index, 1);
};

watch(() => props.property, (newProperty) => {
  if (newProperty) {
    isEditing.value = true;
    form.value = {
      title: newProperty.title,
      description: newProperty.description,
      pricePerNight: Number(newProperty.pricePerNight),
      bedroomsCount: newProperty.bedroomsCount,
      bathroomsCount: newProperty.bathroomsCount,
      capacityPeople: newProperty.capacityPeople,
      address: newProperty.address,
      municipalityId: newProperty.munipalityId.id,
      provinceId: newProperty.provinceId.id,
      contacts: newProperty.contacts.map(c => ({ name: c.name, number: c.number })),
    };
  } else {
    isEditing.value = false;
    resetForm();
  }
}, { immediate: true });

const handleClose = () => {
  if (!isSubmitting.value) {
    emit('close');
  }
};

const handleSubmit = async () => {
  // Validar que haya al menos un contacto
  if (form.value.contacts.length === 0) {
    return;
  }

  isSubmitting.value = true;
  try {
    // Omitir provinceId del formulario
    const { provinceId, ...dataToSubmit } = form.value;
    emit('submit', dataToSubmit);
  } finally {
    isSubmitting.value = false;
  }
};

const selectedImageNames = ref<string[]>([]);
const imageInputRef = ref<HTMLInputElement | null>(null);
const deletingImage = ref<string | null>(null);

const refreshPropertyImages = async () => {
  if (props.property) {
    // Traer la propiedad actualizada desde la API
    const { getCasaActions } = await import('@/modules/casas/actions/get-casa.actions');
    const updated = await getCasaActions(props.property.id);
    // Actualizar las imágenes en el objeto property (reactividad limitada, pero forzamos update)
    props.property.imageUrls.splice(0, props.property.imageUrls.length, ...updated.imageUrls);
  }
};

const clearImageSelection = () => {
  selectedImageNames.value = [];
  if (imageInputRef.value) {
    imageInputRef.value.value = '';
  }
};

const onImageChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || !props.property) return;
  const files = Array.from(input.files);
  selectedImageNames.value = files.map(f => f.name);
  for (const file of files) {
    try {
      await uploadPropertyImage(props.property.id, file);
    } catch (e) {
      // Puedes mostrar un toast aquí si tienes uno disponible
      console.error('Error subiendo imagen', e);
    }
  }
  await refreshPropertyImages();
  // No limpiar la selección automáticamente
};

const handleDeleteImage = async (fileName: string) => {
  if (!props.property) return;
  deletingImage.value = fileName;
  try {
    await deletePropertyImage(props.property.id, fileName);
    await refreshPropertyImages();
  } catch (e) {
    // Puedes mostrar un toast aquí si tienes uno disponible
    console.error('Error eliminando imagen', e);
  } finally {
    deletingImage.value = null;
  }
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
