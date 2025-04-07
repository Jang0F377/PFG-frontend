import { QueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

const QUERY_STALE_TIME = 1000 * 60;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: QUERY_STALE_TIME,
      retry: (failureCount: number, error: any) => {
        const { response } = (error as AxiosError) || {};

        if (Number(response?.status) >= 500) {
          return failureCount < 1;
        }

        return false;
      },
    },
  },
});
