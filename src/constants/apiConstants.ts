import { getBaseUrl } from '@common/utils/http/baseDomain';

export const APP_API_URL = getBaseUrl();

export const _ApiUrls = {
  _baseUrl: APP_API_URL,
  registerUser: '/users/register',
  loginUser: '/users/login',
  getCurrentUser: '/users/me',
};
