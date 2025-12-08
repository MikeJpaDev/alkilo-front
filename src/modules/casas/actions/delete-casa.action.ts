import { AlkiloApi } from '@/api/AlkiloApi';

export const deleteCasa = async (id: string) => {
  return AlkiloApi.delete(`/casas/${id}`);
};
