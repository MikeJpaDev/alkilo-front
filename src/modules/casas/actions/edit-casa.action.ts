import { AlkiloApi } from '@/api/AlkiloApi';
import type { Casa } from '../interfaces/casas.interface';

export const editCasa = async (id: string, data: Partial<Casa>) => {
  return AlkiloApi.put(`/casas/${id}`, data);
};
