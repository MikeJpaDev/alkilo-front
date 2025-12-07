<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <!-- Backdrop -->
          <div class="fixed inset-0 transition-opacity bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75" @click="handleClose"></div>

          <!-- Modal -->
          <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <form @submit.prevent="handleSubmit">
              <!-- Header -->
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
                </h3>
              </div>

              <!-- Body -->
              <div class="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div class="space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre *</label>
                      <input v-model="form.firstName" type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apellido *</label>
                      <input v-model="form.lastName" type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CI *</label>
                    <input v-model="form.ci" type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div v-if="!isEditing">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                    <input v-model="form.email" type="email" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div v-if="!isEditing">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña *</label>
                    <input v-model="form.password" type="password" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dirección *</label>
                    <input v-model="form.address" type="text" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Roles *</label>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input v-model="form.roles" value="user" type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Usuario</span>
                      </label>
                      <label class="flex items-center">
                        <input v-model="form.roles" value="admin" type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Administrador</span>
                      </label>
                      <label class="flex items-center">
                        <input v-model="form.roles" value="superUser" type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Super Usuario</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <button type="button" @click="handleClose" class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Cancelar
                </button>
                <button type="submit" :disabled="isSubmitting || form.roles.length === 0" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors">
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
import { ref, watch } from 'vue';
import type { User, UserRole } from '@/modules/auth/interfaces/user.interface';

interface UserFormData {
  ci: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  password: string;
  roles: UserRole[];
}

const props = defineProps<{
  isOpen: boolean;
  user?: User | null;
}>();

const emit = defineEmits<{
  close: [];
  submit: [data: UserFormData | Partial<UserFormData>];
}>();

const isSubmitting = ref(false);
const isEditing = ref(false);

const form = ref<UserFormData>({
  ci: '',
  firstName: '',
  lastName: '',
  address: '',
  email: '',
  password: '',
  roles: ['user'],
});

const resetForm = () => {
  form.value = {
    ci: '',
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    password: '',
    roles: ['user'],
  };
};

watch(() => props.user, (newUser) => {
  if (newUser) {
    isEditing.value = true;
    form.value = {
      ci: newUser.ci,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      address: newUser.address,
      email: '',
      password: '',
      roles: [...newUser.roles],
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
  isSubmitting.value = true;
  try {
    if (isEditing.value) {
      // Solo enviar campos editables
      const updateData: Partial<UserFormData> = {
        ci: form.value.ci,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        address: form.value.address,
        roles: form.value.roles,
      };
      emit('submit', updateData);
    } else {
      emit('submit', form.value);
    }
  } finally {
    isSubmitting.value = false;
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
