import { AlkiloApi } from '@/api/AlkiloApi';

export const uploadPropertyImage = async (propertyId: string, file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('files', file);
  await AlkiloApi.post(`/casas/${propertyId}/images`, formData);
};
