import { isDevelopment } from '../environment/environment';

export const getBaseUrl = (path = '', domain = 'http://localhost:8000') => {
  // Only use the domain when in development or localhost
  const baseDomain =
    domain && (isDevelopment() || window.location.hostname === 'localhost')
      ? domain
      : '';

  // Return the domain without any path if path is empty
  if (!path) {
    return baseDomain.replace(/\/+$/, '');
  }

  // Otherwise combine domain with path
  return (
    baseDomain.replace(/\/+$/, '') +
    '/' +
    path.replace(/^\/+/, '').replace(/\/$/, '')
  );
};
