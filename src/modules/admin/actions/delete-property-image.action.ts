import { AlkiloApi } from '@/api/AlkiloApi';

export const deletePropertyImage = async (propertyId: string, fileName: string): Promise<void> => {
  await AlkiloApi.delete(`/casas/${propertyId}/images/${encodeURIComponent(fileName)}`);
};
