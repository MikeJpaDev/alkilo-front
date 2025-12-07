<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { getCasaActions } from '../actions/get-casa.actions';
import type { Casa } from '../interfaces/casas.interface';

const router = useRouter();
const route = useRoute();
const houseId = route.params.id as string;

// Consulta para obtener los datos de la casa
const {
  data: house,
  isLoading,
  isError,
} = useQuery<Casa>({
  queryKey: ['casa', houseId],
  queryFn: () => getCasaActions(houseId),
  staleTime: 1000 * 60 * 5, // 5 minutos de refresco
  onError: () => {
    router.push({ name: 'home' }); // Redirige si hay un error
  },
});

console.log(house);

// Función para formatear fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Generar estrellas de rating
const getStars = (rating: number) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

// Manejar contacto
const handleContact = () => {
  if (house.value?.contacts.length) {
    const contact = house.value.contacts[0];
    alert(`Contactando a ${contact.name} al ${contact.number}...`);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 max-w-7xl">
      <!-- Botón Volver -->
      <button
        @click="router.back()"
        class="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Volver
      </button>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Sección de Imagen -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              v-if="property.imageUrls?.length > 0"
              :src="property.imageUrls[0]"
              :alt="property.title"
              class="w-full h-96 lg:h-[500px] object-cover"
            />
            <div
              v-else
              class="w-full h-96 lg:h-[500px] bg-gray-200 flex items-center justify-center"
            >
              <svg
                class="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Card sticky con info -->
        <div class="lg:col-span-1">
          <div class="sticky top-8">
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <!-- Badge de rating -->
              <div class="mb-4">
                <span
                  :class="ratingBadgeClass"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ property.averageRating }} {{ getStars(property.averageRating) }}
                  <span class="ml-2">({{ property.reviewsCount }} reseñas)</span>
                </span>
              </div>

              <!-- Precio -->
              <h3 class="text-3xl font-bold text-blue-600 mb-1">{{ property.pricePerNight }}€</h3>
              <p class="text-gray-500 mb-6">por noche</p>

              <!-- Características -->
              <div class="mb-6">
                <h5 class="font-bold text-gray-900 mb-3">Características</h5>
                <ul class="space-y-3">
                  <li class="flex items-center text-gray-700">
                    <svg
                      class="w-5 h-5 text-blue-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                      ></path>
                    </svg>
                    <strong class="mr-2">Habitaciones:</strong> {{ property.bedroomsCount }}
                  </li>
                  <li class="flex items-center text-gray-700">
                    <svg
                      class="w-5 h-5 text-blue-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0V7a2 2 0 012-2h4a2 2 0 012 2v1M7 13h10l1 8H6l1-8z"
                      ></path>
                    </svg>
                    <strong class="mr-2">Baños:</strong> {{ property.bathroomsCount }}
                  </li>
                  <li class="flex items-center text-gray-700">
                    <svg
                      class="w-5 h-5 text-blue-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    <strong class="mr-2">Capacidad:</strong> {{ property.capacityPeople }} personas
                  </li>
                  <li class="flex items-center text-gray-700">
                    <svg
                      class="w-5 h-5 text-blue-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.94 4.5 4.5 0 00-7.78-2.97A4.5 4.5 0 007.5 9.5 4.5 4.5 0 003 15z"
                      ></path>
                    </svg>
                    <strong class="mr-2">Área:</strong>
                    {{ property.metrosCuadrados || 'No especificado' }} m²
                  </li>
                </ul>
              </div>

              <!-- Propietario -->
              <div class="mb-6">
                <h5 class="font-bold text-gray-900 mb-3">Anfitrión</h5>
                <p class="font-semibold text-gray-800">
                  {{ property.createdBy.firstName }} {{ property.createdBy.lastName }}
                </p>
                <p class="text-sm text-gray-600">{{ property.createdBy.email }}</p>
                <p class="text-sm text-gray-600" v-if="property.contacts.length">
                  <svg
                    class="w-4 h-4 inline mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  {{ property.contacts[0].number }}
                </p>
              </div>

              <!-- Botón de contacto -->
              <button
                @click="handleContact"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-2.4-.322l-3 1.5a1 1 0 01-1.4-1.4l1.5-3A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                  ></path>
                </svg>
                Contactar anfitrión
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Descripción -->
      <div class="mt-8">
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h4 class="text-xl font-bold text-gray-900 mb-3">Descripción</h4>
          <p class="text-gray-700 leading-relaxed">{{ property.description }}</p>
        </div>
      </div>

      <!-- Ubicación -->
      <div class="mt-8">
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h4 class="text-xl font-bold text-gray-900 mb-3">Ubicación</h4>
          <p class="text-gray-700 flex items-start">
            <svg
              class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            {{ property.address }}
          </p>
          <div class="mt-3 text-sm text-gray-600">
            <p><strong>Provincia:</strong> {{ property.provinceId.name }}</p>
            <p><strong>Municipio:</strong> {{ property.munipalityId.name }}</p>
          </div>
        </div>
      </div>

      <!-- Sección de Comentarios/Reseñas -->
      <div class="mt-8">
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <!-- Header de reseñas -->
          <div class="flex items-center justify-between mb-6">
            <h4 class="text-xl font-bold text-gray-900">Reseñas ({{ property.reviewsCount }})</h4>
            <div class="flex items-center">
              <span class="text-2xl font-bold text-blue-600 mr-2">{{
                property.averageRating
              }}</span>
              <span class="text-yellow-500 text-xl">{{ getStars(property.averageRating) }}</span>
            </div>
          </div>

          <!-- Lista de reseñas -->
          <div class="space-y-6">
            <div
              v-for="review in property.reviews"
              :key="review.id"
              class="border-b border-gray-200 pb-6 last:border-0"
            >
              <div class="flex items-start space-x-4">
                <!-- Avatar placeholder -->
                <div
                  class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <span class="text-gray-600 font-semibold">
                    {{ review.user.firstName[0] }}{{ review.user.lastName[0] }}
                  </span>
                </div>

                <div class="flex-1">
                  <div class="flex items-center justify-between mb-1">
                    <p class="font-semibold text-gray-900">
                      {{ review.user.firstName }} {{ review.user.lastName }}
                    </p>
                    <p class="text-sm text-gray-500">{{ formatDate(review.createdAt) }}</p>
                  </div>

                  <div class="text-yellow-500 text-sm mb-2">
                    {{ getStars(review.rating) }}
                  </div>

                  <p class="text-gray-700">{{ review.comment }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulario para nueva reseña (si no ha reseñado) -->
          <div v-if="!property.userHasReviewed" class="mt-8 pt-6 border-t border-gray-200">
            <h5 class="font-bold text-gray-900 mb-4">Deja tu reseña</h5>
            <form @submit.prevent class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Calificación</label>
                <select
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="5">5 estrellas</option>
                  <option value="4">4 estrellas</option>
                  <option value="3">3 estrellas</option>
                  <option value="2">2 estrellas</option>
                  <option value="1">1 estrella</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Comentario</label>
                <textarea
                  rows="4"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Comparte tu experiencia..."
                ></textarea>
              </div>
              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Enviar reseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <article
    class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
  >
    <RouterLink :to="{ name: 'casaDetails', params: { id: casa.id } }">
      <div class="relative flex items-end overflow-hidden rounded-xl">
        <img :src="casa.imageUrls[0]" :alt="casa.title" class="h-48 w-full object-cover" />
        <div
          class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="ml-1 text-sm text-slate-400">{{ casa.reviews[0]?.rating ?? 5 }}</span>
        </div>
      </div>

      <div class="mt-1 p-2">
        <h2 class="text-slate-700">{{ casa.title }}</h2>
        <p class="mt-1 text-sm text-slate-400">
          {{ casa.provinceId.name }}, {{ casa.munipalityId.name }}
        </p>

        <div class="mt-3 flex items-end justify-between">
          <p class="text-lg font-bold text-blue-500">${{ casa.pricePerNight }}</p>

          <div
            class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <button class="text-sm">Ver Detalles</button>
          </div>
        </div>
      </div>
    </RouterLink>
  </article>
</template>
