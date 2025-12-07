import { AlkiloApi } from '@/api/AlkiloApi';
import type { Casa } from '@/modules/casas/interfaces/casas.interface';

export interface Contact {
  name: string;
  number: string;
}

export interface CreatePropertyData {
  title: string;
  description: string;
  pricePerNight: number;
  bedroomsCount: number;
  bathroomsCount: number;
  capacityPeople: number;
  address: string;
  contacts: Contact[];
  municipalityId: number;
}

export const createProperty = async (data: CreatePropertyData): Promise<Casa> => {
  const { data: response } = await AlkiloApi.post<Casa>('/casas', data);
  return response;
};
