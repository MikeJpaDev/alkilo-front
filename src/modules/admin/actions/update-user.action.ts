import { AlkiloApi } from '@/api/AlkiloApi';
import type { User, UserRole } from '@/modules/auth/interfaces/user.interface';

export interface UpdateUserData {
  ci?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  email?: string;
  password?: string;
  roles?: UserRole[];
}

export const updateUser = async (id: string, data: UpdateUserData): Promise<User> => {
  const { data: response } = await AlkiloApi.patch<User>(`/users/${id}`, data);
  return response;
};
