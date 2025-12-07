import { AlkiloApi } from '@/api/AlkiloApi';

export interface Province {
  id: number;
  name: string;
}

interface ProvincesResponse {
  data: Province[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
}

export const getProvinces = async (page = 1, limit = 20): Promise<ProvincesResponse> => {
  const { data } = await AlkiloApi.get<ProvincesResponse>('/provinces', {
    params: { page, limit }
  });
  return data;
};
