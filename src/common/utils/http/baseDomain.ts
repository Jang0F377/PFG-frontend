import { isDevelopment } from '../environment/environment';

export const getBaseUrl = (path = '', domain = 'http://localhost:8000') => {
  const baseDomain =
    domain && (isDevelopment() || window.location.hostname === 'localhost')
      ? domain
      : '';

  return (
    baseDomain.replace(/\/+$/, '') +
    '/' +
    path.replace(/^\/+/, '').replace(/\/$/, '')
  );
};
