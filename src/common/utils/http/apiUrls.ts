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

      const getUrl = (base: string, path?: string) => {
        if (!path) return base.replace(/\/+$/, '');
        return (
          base.replace(/\/+$/, '') + '/' + (path?.replace(/^\/+/, '') || '')
        );
      };

      if (propKey === 'baseUrl') {
        return getUrl(target._baseUrl);
      }

      if (target[propKey] === undefined) {
        throw new Error('API Url not found.');
      }

      const route = getUrl(target._baseUrl, target[propKey]);

      return {
        get: (params: RoutesReturnGetArgs) => {
          // Fix the URL parameter replacement to avoid protocol mangling
          // First extract the protocol and domain part
          const urlParts = route.match(/^(https?:\/\/[^\/]+)(.*)$/);

          if (!urlParts) {
            // No protocol/domain in the URL, just use generatePath directly
            return generatePath(route, params);
          }

          // Separate domain from path and only apply generatePath to the path part
          const [, domain, path] = urlParts;
          const processedPath = generatePath(path, params);
          const finalUrl = `${domain}${processedPath}`;

          return finalUrl;
        },
        route,
      };
    },
  });

  return apiUrls;
}

export const AppApiUrls = apiUrls(_ApiUrls);
