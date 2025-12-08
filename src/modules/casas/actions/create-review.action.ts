import { AlkiloApi } from '@/api/AlkiloApi';

export const createReview = async (casaId: string, data: { rating: number; comment: string }) => {
  // Asegurarse que rating sea int
  const payload = {
    ...data,
    rating: Number(data.rating),
  };
  return AlkiloApi.post(`/review/${casaId}`, payload);
};
