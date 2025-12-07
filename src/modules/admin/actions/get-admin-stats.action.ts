import { AlkiloApi } from '@/api/AlkiloApi';

interface AdminStats {
  users: {
    total: number;
    active: number;
    inactive: number;
  };
  casas: {
    total: number;
  };
  reviews: {
    total: number;
    averageRating: number;
  };
  timestamp: string;
}

export const getAdminStats = async (): Promise<AdminStats> => {
  const { data } = await AlkiloApi.get<AdminStats>('/dashboard/stats');
  return data;
};
