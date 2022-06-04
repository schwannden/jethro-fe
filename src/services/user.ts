import { request } from '@@/plugin-request/request';

export const getUserAuthUrl = async () => {
  return request<API.AuthUrlResponse>(`/user/auth_url`);
};
