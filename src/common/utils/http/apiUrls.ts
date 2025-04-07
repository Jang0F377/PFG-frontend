import { _ApiUrls } from '@constants/apiConstants';
import { generatePath } from 'react-router-dom';

type Routes<T> = T extends { _baseUrl: string } ? T : never;
type RoutesList<T> = keyof Omit<T, '_baseUrl'>;
type RoutesReturnGetArgs = Record<string, string>;
type RoutesReturn = {
  get: (params?: RoutesReturnGetArgs) => string;
  route: string;
};
type RoutesProxy<T> = Record<RoutesList<T>, RoutesReturn> & {
  baseUrl: string;
};

function apiUrls<T>(routes: Routes<T>) {
  const apiUrls: RoutesProxy<T> = new Proxy(routes, {
    get(target: any, propKey: any) {
      if (propKey === '$$typeof') return;

      if (target._baseUrl === undefined) {
        throw new Error('Base Url is missing, make sure the _baseUrl is set.');
      }

      const getUrl = (base: string, path?: string) =>
        base.replace(/\/+$/, '') + '/' + path?.replace(/^\/+/, '') || '';

      if (propKey === 'baseUrl') {
        return getUrl(target._baseUrl);
      }

      if (target[propKey] === undefined) {
        throw new Error('API Url not found.');
      }

      const route = getUrl(target._baseUrl, target[propKey]);

      return {
        get: (params: RoutesReturnGetArgs) => generatePath(route, params),
        route,
      };
    },
  });

  return apiUrls;
}

export const AppApiUrls = apiUrls(_ApiUrls);
