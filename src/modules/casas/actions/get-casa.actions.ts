import { AlkiloApi } from '@/api/AlkiloApi';
import type { Casa } from '../interfaces/casas.interface';

export const getCasaActions = async (id: string): Promise<Casa> => {
  try {
    const { data } = await AlkiloApi.get<Casa>(`/casas/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching casa:', error);
    throw new Error('Error fetching casa');
  }
};
