import { AlkiloApi } from '@/api/AlkiloApi';
import type { AuthResponse } from '../interfaces/login.interface';
import { isAxiosError } from 'axios';
import type { User } from '../interfaces/user.interface';

interface registerError {
  ok: false;
  message: string;
}

interface registerSuccess {
  ok: true;
  data: User;
  token: string;
}

export const registerAction = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  address: string,
  ci: string,
): Promise<registerError | registerSuccess> => {
  try {
    const { data } = await AlkiloApi.post('/auth/register', {
      firstName,
      lastName,
      email,
      password,
      address, // corregido
      ci,
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
    console.error('Register action error:', error);
    if (isAxiosError(error) && error.response) {
      // mostrar mensaje del backend si existe
      const message =
        (error.response.data &&
          (error.response.data.message || JSON.stringify(error.response.data))) ||
        'Bad Request';
      return { ok: false, message };
    }
    throw error;
  }
};
