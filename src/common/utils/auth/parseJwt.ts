import memoize from 'lodash/memoize';

export const parseJwt = memoize((token: string | null) => {
  if (token === undefined || token === null) return undefined;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT', error);
  }
});
