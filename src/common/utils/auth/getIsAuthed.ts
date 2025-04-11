import { clearTokens, getIdToken, isIdTokenExpired } from './tokens';

export const getIsAuthed = () => {
  const token = getIdToken();
  if (!token) return false;

  if (!isIdTokenExpired(token)) {
    return true;
  }

  clearTokens();
  return false;
};
