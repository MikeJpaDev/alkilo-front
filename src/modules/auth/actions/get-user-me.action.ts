import { AlkiloApi } from '@/api/AlkiloApi';
import type { User } from '../interfaces/user.interface';

interface UserMeResponse extends User {
  email: string;
  createdAt: string;
}

export const getUserMe = async (): Promise<UserMeResponse> => {
  const { data } = await AlkiloApi.get<UserMeResponse>('/auth/user/me');
  return data;
};
