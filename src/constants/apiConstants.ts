import { getBaseUrl } from '@common/utils/http/baseDomain';

// Hard-code the API URL to avoid domain duplication issues
export const APP_API_URL = getBaseUrl();

export const _ApiUrls = {
  _baseUrl: APP_API_URL,
  registerUser: '/users/register',
  loginUser: '/users/login',
  getCurrentUser: '/users/me',
  updateUserAccount: '/users/:userId',
  getAllUsers: '/users',
  validateRecipientEmail: '/users/validate-recipient/:email',
  createSesh: '/sesh',
  sendSeshDecision: '/sesh/:seshId/:decision',
  sendFriendRequest: '/friends/request',
  answerFriendRequest: '/friends/:friendRequestId/:decision',
};
