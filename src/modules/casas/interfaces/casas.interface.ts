// interfaces/casas.interface.ts

// Interfaz para CreatedBy (usuario que creó la casa)
export interface CreatedBy {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Interfaz para Contacto
export interface Contact {
  id: number;
  name: string;
  number: string;
}

// Interfaz para Provincia
export interface Province {
  id: number;
  name: string;
}

// Interfaz para Municipio (incluye provincia)
export interface Municipality {
  id: number;
  name: string;
  province: Province;
}

// Interfaz para Review
export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

// Interfaz principal para Casa
export interface Casa {
  id: string;
  createdBy: CreatedBy;
  title: string;
  description: string;
  pricePerNight: string; // O puedes usar number si lo conviertes
  bedroomsCount: number;
  bathroomsCount: number;
  capacityPeople: number;
  metrosCuadrados?: number;
  address: string;
  createDate: string;
  contacts: Contact[];
  munipalityId: Municipality; // Nota: hay un typo en "munipality" debería ser "municipality"
  provinceId: Province;
  reviews: Review[];
  reviewsCount: number;
  averageRating: number;
  userHasReviewed?: boolean;
  imageUrls: string[];
}

// Interfaz para Metadatos de paginación
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

// Interfaz para la respuesta completa de la API
export interface CasasResponse {
  data: Casa[];
  meta: PaginationMeta;
}

export interface ImageUrls {
  fileName: string;
  url: string;
}
