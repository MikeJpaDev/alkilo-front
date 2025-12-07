import { AlkiloApi } from '@/api/AlkiloApi';
import type { Casa, CasasResponse } from '../interfaces/casas.interface';

export const getCasasActions = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await AlkiloApi.get<CasasResponse>(
      `/casas?page=${page}&limit=${limit}`,
    );
    console.log('Casas response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching casas:', error);
    throw new Error('Error fetching casas');
  }
};
