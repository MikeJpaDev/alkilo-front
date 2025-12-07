import { AlkiloApi } from '@/api/AlkiloApi';
import type { Casa } from '@/modules/casas/interfaces/casas.interface';

export interface UpdatePropertyData {
  title?: string;
  description?: string;
  pricePerNight?: number;
  bedroomsCount?: number;
  bathroomsCount?: number;
  capacityPeople?: number;
  metrosCuadrados?: number;
  address?: string;
  municipalityId?: number;
  provinceId?: number;
}

export const updateProperty = async (id: string, data: UpdatePropertyData): Promise<Casa> => {
  const { data: response } = await AlkiloApi.patch<Casa>(`/casas/${id}`, data);
  return response;
};
