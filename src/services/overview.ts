import { request } from '@@/plugin-request/request';

export const getServiceSummery = async (filter: API.ServiceSummaryFilter) => {
  return request<API.ServiceSummary[]>(`/service/all`, { param: filter });
};
