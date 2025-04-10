import { AppApiUrls } from '@common/utils/http/apiUrls';
import { http } from '@common/utils/http/http';
import { ApiData } from '@common/utils/http/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface GetCurrentUserResponse {
  id: string;
  email: string;
  username?: string;
  favoriteGames?: string[];
  role: string;
  createdAt: string;
  updatedAt: string;
  friendRequests: [];
  friends: [];
  upcomingCreatedSeshes: [];
  seshInvites: [];
}

export type GetCurrentUserResponseData = ApiData<GetCurrentUserResponse>;

export const getCurrentUser = async () => {
  return http.get<GetCurrentUserResponseData>(
    AppApiUrls.getCurrentUser.route,
    {},
    {
      snakecaseData: true,
      camelcaseResponse: true,
    },
  );
};

export const useApiGetCurrentUser = () => {
  return useQuery<GetCurrentUserResponseData, AxiosError>({
    queryKey: useApiGetCurrentUser.getKey(),
    queryFn: getCurrentUser,
  });
};
useApiGetCurrentUser.getKey = () => ['getCurrentUser'];
