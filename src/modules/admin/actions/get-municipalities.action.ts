import { AlkiloApi } from '@/api/AlkiloApi';

export interface Municipality {
  id: number;
  name: string;
  province: {
    id: number;
    name: string;
  };
}

interface MunicipalitiesResponse {
  province: string;
  municipalities: Municipality[];
}

export const getMunicipalitiesByProvince = async (provinceId: number): Promise<MunicipalitiesResponse> => {
  const { data } = await AlkiloApi.get<MunicipalitiesResponse>(`/provinces/${provinceId}/municipalities`);
  return data;
};
