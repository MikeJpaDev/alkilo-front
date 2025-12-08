import { AlkiloApi } from '@/api/AlkiloApi';
import type { CasasResponse } from '../interfaces/casas.interface';

export const getMyCasas = async (page = 1, limit = 10): Promise<CasasResponse> => {
  const { data } = await AlkiloApi.get(`/casas/my-casas?page=${page}&limit=${limit}`);
  return data;
};
