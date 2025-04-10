import { getIdToken } from './tokens';
import { parseJwt } from './parseJwt';

export const getUserId = (): string => {
  const token = getIdToken();
  if (!token) return '';

  const decodedToken = parseJwt(token);
  return decodedToken?.sub || '';
};
