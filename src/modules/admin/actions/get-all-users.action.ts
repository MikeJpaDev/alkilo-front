import { AlkiloApi } from '@/api/AlkiloApi';
import type { User } from '@/modules/auth/interfaces/user.interface';

interface UsersResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getAllUsers = async (page = 1, limit = 10): Promise<UsersResponse> => {
  const { data } = await AlkiloApi.get<UsersResponse>('/auth', {
    params: { page, limit }
  });
  return data;
};
