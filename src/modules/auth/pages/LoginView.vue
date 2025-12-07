<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form @submit.prevent="onLogin">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo</label>
      <input
        ref="emailInputRed"
        type="text"
        id="correo"
        name="correo"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
        v-model="myForm.email"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input
        ref="passwordlInputRed"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
        v-model="myForm.password"
      />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input
        type="checkbox"
        id="remember"
        name="remember"
        class="text-blue-500"
        v-model="myForm.remember"
      />
      <label for="remember" class="text-gray-600 ml-2">Recordar Usuario</label>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Login
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline">Registrarse</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.store';

const aurhStorage = useAuthStore();
const router = useRouter();
const myForm = reactive({
  email: '',
  password: '',
  remember: false,
});

const emailInputRed = ref<HTMLInputElement | null>(null);
const passwordlInputRed = ref<HTMLInputElement | null>(null);

const onLogin = async () => {
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', emailInputRed);
  const ok = await aurhStorage.login(myForm.email, myForm.password);
  console.log(ok);
};
</script>
