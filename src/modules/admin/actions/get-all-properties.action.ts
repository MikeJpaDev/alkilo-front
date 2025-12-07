import { AlkiloApi } from '@/api/AlkiloApi';
import type { CasasResponse } from '@/modules/casas/interfaces/casas.interface';

export const getAllProperties = async (page = 1, limit = 10): Promise<CasasResponse> => {
  const { data } = await AlkiloApi.get<CasasResponse>('/casas', {
    params: { page, limit }
  });
  return data;
};
