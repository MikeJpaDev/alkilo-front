import { AlkiloApi } from '@/api/AlkiloApi';
import type { Review } from '@/modules/casas/interfaces/casas.interface';

interface ReviewsResponse {
  data: Review[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getAllReviews = async (page = 1, limit = 10): Promise<ReviewsResponse> => {
  const { data } = await AlkiloApi.get<ReviewsResponse>('/reviews', {
    params: { page, limit }
  });
  return data;
};
