<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { getCasaActions } from '../actions/get-casa.actions';
import type { Casa } from '../interfaces/casas.interface';
import ContactNumbers from '@/modules/casas/components/ContactNumbers.vue';

const router = useRouter();
const route = useRoute();
const houseId = route.params.id as string;

// Estado para el carrusel de imágenes
const currentImageIndex = ref(0);
let carouselInterval: number | null = null;

// Consulta para obtener los datos de la casa
const {
  data: house,
  isLoading,
  isError,
} = useQuery<Casa>({
  queryKey: ['casa', houseId],
  queryFn: () => getCasaActions(houseId),
  staleTime: 1000 * 60 * 5, // 5 minutos de refresco
});

console.log('House data:', house.value?.contacts);

// Computed para el badge de rating
const ratingBadgeClass = computed(() => {
  const rating = house.value?.averageRating || 0;
  if (rating >= 4.5) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  if (rating >= 3.5)
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
  return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
});

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
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
};

// Manejar contacto
const handleContact = () => {
  if (house.value?.contacts.length) {
    const contact = house.value.contacts[0];
    alert(`Contactando a ${contact.name} al ${contact.number}...`);
  }
};

// Funciones del carrusel
const nextImage = () => {
  if (house.value?.imageUrls && house.value.imageUrls.length > 0) {
    currentImageIndex.value = (currentImageIndex.value + 1) % house.value.imageUrls.length;
  }
};

const prevImage = () => {
  if (house.value?.imageUrls && house.value.imageUrls.length > 0) {
    currentImageIndex.value =
      currentImageIndex.value === 0
        ? house.value.imageUrls.length - 1
        : currentImageIndex.value - 1;
  }
};

const goToImage = (index: number) => {
  currentImageIndex.value = index;
};

// Iniciar carrusel automático (1 segundo)
const startCarousel = () => {
  if (house.value?.imageUrls && house.value.imageUrls.length > 1) {
    carouselInterval = window.setInterval(nextImage, 1000); // Cambiar cada 1 segundo
  }
};

// Detener carrusel automático
const stopCarousel = () => {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
};

// Lifecycle hooks
onMounted(() => {
  startCarousel();
});

onUnmounted(() => {
  stopCarousel();
});

console.log(house.value);
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
    <div class="container mx-auto px-4 max-w-7xl">
      <!-- Botón Volver -->
      <button
        @click="router.back()"
        class="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors"
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

      <!-- Estado de carga -->
      <div v-if="isLoading" class="flex justify-center items-center min-h-[400px]">
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"
          ></div>
          <p class="mt-4 text-gray-600 dark:text-gray-400">Cargando detalles de la casa...</p>
        </div>
      </div>

      <!-- Estado de error -->
      <div
        v-else-if="isError"
        class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center"
      >
        <svg
          class="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h3 class="text-xl font-semibold text-red-800 dark:text-red-300 mb-2">
          Error al cargar la casa
        </h3>
        <p class="text-red-600 dark:text-red-400 mb-4">
          No se pudieron obtener los detalles de esta propiedad.
        </p>
        <button
          @click="router.push({ name: 'home' })"
          class="bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Volver al inicio
        </button>
      </div>

      <!-- Contenido principal -->
      <div v-else-if="house" class="grid lg:grid-cols-3 gap-8">
        <!-- Sección de Imagen con Carrusel -->
        <div class="lg:col-span-2">
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-transparent dark:border-gray-700 relative"
          >
            <!-- Carrusel de imágenes -->
            <div
              v-if="house?.imageUrls && house.imageUrls.length > 0"
              class="relative"
              @mouseenter="stopCarousel"
              @mouseleave="startCarousel"
            >
              <!-- Imagen actual -->
              <div class="relative w-full h-96 lg:h-[500px]">
                <img
                  :src="house.imageUrls[currentImageIndex].url"
                  :alt="`${house.title} - Imagen ${currentImageIndex + 1}`"
                  class="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>

              <!-- Botones de navegación -->
              <button
                v-if="house.imageUrls.length > 1"
                @click="prevImage"
                class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </button>
              <button
                v-if="house.imageUrls.length > 1"
                @click="nextImage"
                class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>

              <!-- Indicadores de imagen -->
              <div
                v-if="house.imageUrls.length > 1"
                class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
              >
                <button
                  v-for="(img, index) in house.imageUrls"
                  :key="index"
                  @click="goToImage(index)"
                  :class="[
                    'w-2 h-2 rounded-full transition-all',
                    currentImageIndex === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75',
                  ]"
                ></button>
              </div>

              <!-- Contador de imágenes -->
              <div
                class="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm"
              >
                {{ currentImageIndex + 1 }} / {{ house.imageUrls.length }}
              </div>
            </div>

            <!-- Placeholder si no hay imágenes -->
            <div
              v-else
              class="w-full h-96 lg:h-[500px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
            >
              <div class="text-center">
                <svg
                  class="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-2"
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
                <p class="text-gray-500 dark:text-gray-400">Sin imágenes disponibles</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card sticky con info -->
        <div class="lg:col-span-1">
          <div class="sticky top-8">
            <div
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-transparent dark:border-gray-700"
            >
              <!-- Badge de rating -->
              <div class="mb-4">
                <span
                  :class="ratingBadgeClass"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ house?.averageRating }} {{ getStars(house?.averageRating || 0) }}
                  <span class="ml-2">({{ house?.reviewsCount }} reseñas)</span>
                </span>
              </div>

              <!-- Precio -->
              <h3 class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {{ house?.pricePerNight }}€
              </h3>
              <p class="text-gray-500 dark:text-gray-400 mb-6">por noche</p>

              <!-- Características -->
              <div class="mb-6">
                <h5 class="font-bold text-gray-900 dark:text-gray-100 mb-3">Características</h5>
                <ul class="space-y-3">
                  <li class="flex items-center text-gray-700 dark:text-gray-300">
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
                    <strong class="mr-2">Habitaciones:</strong> {{ house?.bedroomsCount }}
                  </li>
                  <li class="flex items-center text-gray-700 dark:text-gray-300">
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
                    <strong class="mr-2">Baños:</strong> {{ house?.bathroomsCount }}
                  </li>
                  <li class="flex items-center text-gray-700 dark:text-gray-300">
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
                    <strong class="mr-2">Capacidad:</strong> {{ house?.capacityPeople }} personas
                  </li>
                </ul>
              </div>

              <!-- Propietario -->
              <div class="mb-6">
                <h5 class="font-bold text-gray-900 dark:text-gray-100 mb-3">Anfitrión</h5>
                <p class="font-semibold text-gray-800 dark:text-gray-200">
                  {{ house?.createdBy.firstName }} {{ house?.createdBy.lastName }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ house?.createdBy.email }}</p>
                <template v-if="house?.contacts.length">
                  <h5 class="font-bold text-gray-900 dark:text-gray-100 mb-3">Contactos:</h5>
                  <ContactNumbers
                    v-for="contact in house.contacts"
                    :key="contact.id"
                    :contact="contact"
                  ></ContactNumbers>
                </template>
              </div>

              <!-- Botón de contacto -->
              <button
                @click="handleContact"
                class="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
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
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-transparent dark:border-gray-700"
        >
          <h4 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Descripción</h4>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ house?.description }}</p>
        </div>
      </div>

      <!-- Ubicación -->
      <div class="mt-8">
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-transparent dark:border-gray-700"
        >
          <h4 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Ubicación</h4>
          <p class="text-gray-700 dark:text-gray-300 flex items-start">
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
            {{ house?.address }}
          </p>
          <div class="mt-3 text-sm text-gray-600">
            <p><strong>Provincia:</strong> {{ house?.provinceId.name }}</p>
            <p><strong>Municipio:</strong> {{ house?.munipalityId.name }}</p>
          </div>
        </div>
      </div>

      <!-- Sección de Comentarios/Reseñas -->
      <div class="mt-8">
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-transparent dark:border-gray-700"
        >
          <!-- Header de reseñas -->
          <div class="flex items-center justify-between mb-6">
            <h4 class="text-xl font-bold text-gray-900 dark:text-gray-100">
              Reseñas ({{ house?.reviewsCount }})
            </h4>
            <div class="flex items-center">
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-400 mr-2">{{
                house?.averageRating
              }}</span>
              <span class="text-yellow-500 text-xl">{{ getStars(house?.averageRating || 0) }}</span>
            </div>
          </div>

          <!-- Lista de reseñas -->
          <div class="space-y-6">
            <div
              v-for="review in house?.reviews"
              :key="review.id"
              class="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
            >
              <div class="flex items-start space-x-4">
                <!-- Avatar placeholder -->
                <div
                  class="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <span class="text-gray-600 dark:text-gray-200 font-semibold">
                    {{ review.user.firstName[0] }}{{ review.user.lastName[0] }}
                  </span>
                </div>

                <div class="flex-1">
                  <div class="flex items-center justify-between mb-1">
                    <p class="font-semibold text-gray-900 dark:text-gray-100">
                      {{ review.user.firstName }} {{ review.user.lastName }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ formatDate(review.createdAt) }}
                    </p>
                  </div>

                  <div class="text-yellow-500 text-sm mb-2">
                    {{ getStars(review.rating) }}
                  </div>

                  <p class="text-gray-700 dark:text-gray-300">{{ review.comment }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulario para nueva reseña (si no ha reseñado) -->
          <div
            v-if="!house?.userHasReviewed"
            class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <h5 class="font-bold text-gray-900 dark:text-gray-100 mb-4">Deja tu reseña</h5>
            <form @submit.prevent class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >Calificación</label
                >
                <select
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="5">5 estrellas</option>
                  <option value="4">4 estrellas</option>
                  <option value="3">3 estrellas</option>
                  <option value="2">2 estrellas</option>
                  <option value="1">1 estrella</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >Comentario</label
                >
                <textarea
                  rows="4"
                  class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Comparte tu experiencia..."
                ></textarea>
              </div>
              <button
                type="submit"
                class="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Enviar reseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
