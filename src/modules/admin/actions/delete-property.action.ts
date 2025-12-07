import { AlkiloApi } from '@/api/AlkiloApi';

export const deleteProperty = async (propertyId: string): Promise<void> => {
  await AlkiloApi.delete(`/casas/${propertyId}`);
};
