<template>
  <h1 class="text-2xl font-semibold mb-4">Register</h1>

  <form @submit.prevent="onRegister" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="ci" class="block text-gray-600">CI</label>
        <input
          v-model="form.ci"
          type="text"
          id="ci"
          name="ci"
          required
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>

      <div>
        <label for="email" class="block text-gray-600">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          name="email"
          required
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>

      <div>
        <label for="firstName" class="block text-gray-600">First Name</label>
        <input
          v-model="form.firstName"
          type="text"
          id="firstName"
          name="firstName"
          required
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>

      <div>
        <label for="lastName" class="block text-gray-600">Last Name</label>
        <input
          v-model="form.lastName"
          type="text"
          id="lastName"
          name="lastName"
          required
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>

      <div class="md:col-span-2">
        <label for="address" class="block text-gray-600">Address</label>
        <input
          v-model="form.address"
          type="text"
          id="address"
          name="address"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>

      <div class="md:col-span-2">
        <label for="password" class="block text-gray-600">contraseña</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          name="password"
          required
          minlength="8"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="new-password"
        />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4"
      >
        Register
      </button>

      <RouterLink :to="{ name: 'login' }" class="text-blue-500 hover:underline"
        >Already have an account?</RouterLink
      >
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../store/auth.store';
import { useToast } from 'vue-toastification';
const form = reactive({
  ci: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  address: '',
});

const toast = useToast();
const aurhStorage = useAuthStore();
const emailInputRed = ref<HTMLInputElement | null>(null);
const passwordlInputRed = ref<HTMLInputElement | null>(null);

const onRegister = async () => {
  console.log('onRegister', form);
  const ok = await aurhStorage.register(
    form.firstName,
    form.lastName,
    form.email,
    form.password,
    form.address,
    form.ci,
  );
  console.log('register ok', ok);
  if (ok) return;
  toast.error('Credenciales incorrectas', {
    timeout: 2000,
  });
};

const onSubmit = async () => {
  // simple front validation
  if (!form.ci || !form.firstName || !form.lastName || !form.email || !form.password) {
    toast.error('Por favor complete los campos requeridos');
    return;
  }

  // payload ready to send to backend
  const payload = {
    ci: form.ci,
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    password: form.password,
    address: form.address,
  };

  // por ahora solo log, reemplazar por llamada a la API (registerAction)
  console.log('register payload', payload);
  toast.success('Registro preparado (ver consola)');

  const ok = await aurhStorage.register(
    form.ci,
    form.firstName,
    form.lastName,
    form.email,
    form.password,
    form.address,
  );

  if (ok) {
    toast.success('Registro exitoso');
    return;
  }
};
</script>
