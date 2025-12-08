import { AlkiloApi } from '@/api/AlkiloApi';
import { isAxiosError } from 'axios';
import type { User } from '../interfaces/user.interface';

interface CkeckError {
  ok: false;
}

interface CkeckSuccess {
  ok: true;
  data: User;
  token: string;
}

export const checkAuthAction = async (): Promise<CkeckError | CkeckSuccess> => {
  try {
    const localToken = localStorage.getItem('token');
    console.log('Token local en checkAuthAction:', localToken);
    if (localToken && localToken.length < 10) return { ok: false };

    const { data } = await AlkiloApi.get('/auth/check-auth');

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
    console.log('Error en checkAuthAction:', error);
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
      };
    }

    throw new Error('No se pudo verificar la Data');
  }
};
