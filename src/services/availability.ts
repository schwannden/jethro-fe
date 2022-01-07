import { request } from 'umi';

export const getAvailability = async () => {
  return request<API.UserAvailability[]>(`/availability`);
};
