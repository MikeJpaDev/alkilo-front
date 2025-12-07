import { AlkiloApi } from '@/api/AlkiloApi';
import type { AuthResponse } from '../interfaces/login.interface';
import { isAxiosError } from 'axios';
import type { User } from '../interfaces/user.interface';

interface LoginError {
  ok: false;
  message: string;
}

interface LoginSuccess {
  ok: true;
  data: User;
  token: string;
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await AlkiloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    console.log('Datos recibidos:', data);

    return {
      ok: true,
      data: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        ci: data.ci,
        address: data.address,
        profilePictureUrl: data.profilePictureUrl,
        roles: data.roles,
      },
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error))
      if (error.response?.status === 401) {
        return {
          ok: false,
          message: 'Credenciales Incorrectas',
        };
      }

    console.error('Login action error:', error);
    throw error;
  }
};
