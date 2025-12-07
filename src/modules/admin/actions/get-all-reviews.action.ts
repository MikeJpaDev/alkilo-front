import { AlkiloApi } from '@/api/AlkiloApi';
import type { Review } from '@/modules/casas/interfaces/casas.interface';

interface ReviewsResponse {
  data: Review[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
}

export const getAllReviews = async (
  page = 1,
  limit = 10,
  userId?: string
): Promise<ReviewsResponse> => {
  const params: Record<string, any> = { page, limit };

  if (userId) {
    params.userId = userId;
  }

  const { data } = await AlkiloApi.get<ReviewsResponse>('/reviews', {
    params
  });
  return data;
};
