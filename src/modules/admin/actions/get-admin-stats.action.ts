import { AlkiloApi } from '@/api/AlkiloApi';

interface AdminStats {
  totalProperties: number;
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  propertiesGrowth: number;
  usersGrowth: number;
  bookingsGrowth: number;
  revenueGrowth: number;
}

export const getAdminStats = async (): Promise<AdminStats> => {
  const { data } = await AlkiloApi.get<AdminStats>('/stats');
  return data;
};
