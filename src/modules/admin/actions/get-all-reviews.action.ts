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
  userId?: string,
  rating?: number
): Promise<ReviewsResponse> => {
  const params: Record<string, any> = { page, limit };

  if (userId) {
    params.userId = userId;
  }

  if (rating) {
    params.rating = rating;
  }

  const { data } = await AlkiloApi.get<ReviewsResponse>('/review', {
    params
  });
  return data;
};
