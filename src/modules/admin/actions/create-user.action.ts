import { AlkiloApi } from '@/api/AlkiloApi';
import type { User, UserRole } from '@/modules/auth/interfaces/user.interface';

export interface CreateUserData {
  ci: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  password: string;
  roles: UserRole[];
}

export const createUser = async (data: CreateUserData): Promise<User> => {
  const { data: response } = await AlkiloApi.post<User>('/users', data);
  return response;
};
