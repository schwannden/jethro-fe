import { request } from 'umi';

export const getOverview = async () => {
  return request<API.ServiceSummary[]>(`/overview`);
};
