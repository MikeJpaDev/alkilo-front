import { AlkiloApi } from '@/api/AlkiloApi';
import type { Casa } from '../interfaces/casas.interface';

export interface CreateCasaPayload {
  title: string;
  description: string;
  pricePerNight: number;
  bedroomsCount: number;
  bathroomsCount: number;
  capacityPeople: number;
  address: string;
  municipalityId: number;
  contacts: { name: string; number: string }[];
}

export const createCasa = async (payload: CreateCasaPayload): Promise<Casa> => {
  try {
    const { data } = await AlkiloApi.post<Casa>('/casas', payload);
    // si el backend envuelve en data.data ajustar aquí: return data.data ?? data;
    return data as Casa;
  } catch (error: any) {
    // lanzar mensaje legible para la UI
    const msg = error?.response?.data?.message || error?.message || 'Error creating casa';
    throw new Error(msg);
  }
};
