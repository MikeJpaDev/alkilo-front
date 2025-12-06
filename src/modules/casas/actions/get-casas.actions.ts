import { AlkiloApi } from '@/api/AlkiloApi';
import type { Casa, CasasResponse } from '../interfaces/casas.interface';

export const getCasasActions = async (page: number = 1, limit: number = 12) => {
  try {
    const { data } = await AlkiloApi.get<CasasResponse>(
      `/Casas?page=${page}&limit=${limit * page}`,
    );
    console.log(data.data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching casas');
  }
};
