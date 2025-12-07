import { AlkiloApi } from '@/api/AlkiloApi';

export const deleteUser = async (userId: string): Promise<void> => {
  await AlkiloApi.delete(`/users/${userId}`);
};
