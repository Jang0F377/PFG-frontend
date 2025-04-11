import { generatePath } from 'react-router-dom';

export const routeUrls = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  DASHBOARD: '/dashboard',
  ACCOUNT: '/account',
  SUPPORT_US: '/support-pfg',
};

type urlProxy<T> = Record<
  keyof T,
  {
    get: (
      params?: Record<string, string>,
      query?: Record<string, string> | URLSearchParams,
    ) => string;
    route: string;
  }
>;

const createProxyWithPrefix = <T extends Record<string, string>>(
  prefix: string,
  urls: T,
): urlProxy<T> => {
  return new Proxy(urls, {
    get(target: any, propKey: any) {
      if (propKey === '$$typeof') return;

      if (target[propKey] === undefined)
        throw new Error(`Router URL not found for ${propKey}`);
      const route = prefix + target[propKey];
      return {
        get: (
          params?: Record<string, string>,
          query?: Record<string, string> | URLSearchParams,
        ) => {
          try {
            return (
              generatePath(route, params),
              query ? `?${new URLSearchParams(query).toString()}` : ''
            );
          } catch {
            return;
          }
        },
        route,
      };
    },
  });
};

export const urls = createProxyWithPrefix('', routeUrls);
