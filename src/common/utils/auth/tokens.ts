import { parseJwt } from './parseJwt';

export const ID_TOKEN_KEY = 'idToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

export const setIdToken = (token: string) => {
  localStorage.setItem(ID_TOKEN_KEY, token);
};

export const getIdToken = () => {
  const token = localStorage.getItem(ID_TOKEN_KEY);
  return token;
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  return refreshToken;
};

export const clearTokens = () => {
  localStorage.removeItem(ID_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getSecondsTillIdTokenExpires = (token: string) => {
  const timeInMs = new Date().getTime();
  const currentTimeInSeconds = timeInMs / 1000;
  const idTokenExpiry = parseJwt(token)?.exp || -1;
  return idTokenExpiry - currentTimeInSeconds;
};

export const isIdTokenExpired = (token: string) => {
  return getSecondsTillIdTokenExpires(token) <= 0;
};
