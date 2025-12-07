import { AlkiloApi } from '@/api/AlkiloApi';

export const deleteReview = async (reviewId: number): Promise<void> => {
  await AlkiloApi.delete(`/reviews/${reviewId}`);
};
