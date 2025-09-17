import { getUserId } from '@common/utils/auth/getUserId';
import { AppApiUrls } from '@common/utils/http/apiUrls';
import { http } from '@common/utils/http/http';
import { ApiResponse } from '@common/utils/http/types';
import { useQuery } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import {
  Friend,
  FriendRequest,
  Recipient,
  UpcomingSesh,
} from '@custom-types/domain';

export interface GetCurrentUserResponse {
  id: string;
  email: string;
  username?: string;
  favoriteGames?: string[];
  role: string;
  createdAt: string;
  updatedAt: string;
  pfgSupporter: boolean;
  friendRequests: {
    received: FriendRequest[];
    sent: FriendRequest[];
  };
  friends: Friend[];
  upcomingCreatedSeshes: UpcomingSesh[];
  seshInvites: Recipient[];
}

export type GetCurrentUserResponseData = ApiResponse<GetCurrentUserResponse>;

export const getCurrentUser = async () => {
  return http.get<GetCurrentUserResponseData>(
    AppApiUrls.getCurrentUser.get(),
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
    enabled: !!getUserId(),
  });
};
useApiGetCurrentUser.getKey = () => ['getCurrentUser', getUserId()];
