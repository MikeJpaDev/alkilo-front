<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Usuarios</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Administra todos los usuarios del sistema</p>
      </div>
      <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Nuevo Usuario
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input v-model="filters.search" type="text" placeholder="Buscar por nombre o email..." class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
        <select v-model="filters.role" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="">Todos los roles</option>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
          <option value="superUser">Super Usuario</option>
        </select>
        <button @click="applyFilters" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors">
          Filtrar
        </button>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Usuario</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">CI</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Dirección</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Roles</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-if="isLoading">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                Cargando usuarios...
              </td>
            </tr>
            <tr v-else-if="!users?.data || users.data.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No se encontraron usuarios
              </td>
            </tr>
            <tr v-else v-for="user in users.data" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img v-if="user.profilePictureUrl" :src="user.profilePictureUrl" :alt="user.firstName" class="w-10 h-10 rounded-full object-cover" />
                  <div v-else class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold">
                    {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user.firstName }} {{ user.lastName }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.id.substring(0, 8) }}...</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                {{ user.ci }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                {{ user.address }}
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span v-for="role in user.roles" :key="role" :class="getRoleClass(role)">
                    {{ getRoleLabel(role) }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <button class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button @click="handleDelete(user.id)" class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="users?.meta" class="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Mostrando {{ ((users.meta.page - 1) * users.meta.limit) + 1 }} - {{ Math.min(users.meta.page * users.meta.limit, users.meta.total) }} de {{ users.meta.total }} usuarios
          </p>
          <div class="flex gap-2">
            <button @click="currentPage--" :disabled="currentPage === 1" :class="['px-4 py-2 rounded-lg font-medium transition-colors', currentPage > 1 ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed']">
              Anterior
            </button>
            <button @click="currentPage++" :disabled="currentPage >= users.meta.totalPages" :class="['px-4 py-2 rounded-lg font-medium transition-colors', currentPage < users.meta.totalPages ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed']">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getAllUsers, deleteUser } from '../actions';
import type { UserRole } from '@/modules/auth/interfaces/user.interface';

const queryClient = useQueryClient();
const currentPage = ref(1);
const filters = ref({
  search: '',
  role: ''
});

const { data: users, isLoading } = useQuery({
  queryKey: ['adminUsersList', currentPage],
  queryFn: () => getAllUsers(currentPage.value, 10),
});

const deleteMutation = useMutation({
  mutationFn: deleteUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['adminUsersList'] });
  },
});

const handleDelete = async (id: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
    await deleteMutation.mutateAsync(id);
  }
};

const getRoleLabel = (role: UserRole): string => {
  const labels: Record<UserRole, string> = {
    user: 'Usuario',
    admin: 'Admin',
    superUser: 'Super User'
  };
  return labels[role] || role;
};

const getRoleClass = (role: UserRole): string => {
  const classes: Record<UserRole, string> = {
    user: 'px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400',
    admin: 'px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400',
    superUser: 'px-2 py-1 text-xs font-semibold rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400'
  };
  return classes[role] || '';
};

const applyFilters = () => {
  console.log('Aplicando filtros:', filters.value);
};
</script>
