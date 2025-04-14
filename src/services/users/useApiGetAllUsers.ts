import { getUserId } from '@common/utils/auth/getUserId';
import { AppApiUrls } from '@common/utils/http/apiUrls';
import { http } from '@common/utils/http/http';
import { ApiResponse } from '@common/utils/http/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface GetAllUsersResponse {
  id: string;
  email: string;
  username?: string;
  favoriteGames?: string[];
}

export type GetAllUsersResponseData = ApiResponse<GetAllUsersResponse[]>;

export const getAllUsers = async () => {
  return http.get<GetAllUsersResponseData>(
    AppApiUrls.getAllUsers.get(),
    {},
    {
      snakecaseData: true,
      camelcaseResponse: true,
    },
  );
};

export const useApiGetAllUsers = () => {
  return useQuery<GetAllUsersResponseData, AxiosError>({
    queryKey: useApiGetAllUsers.getKey(),
    queryFn: getAllUsers,
    enabled: !!getUserId(),
  });
};
useApiGetAllUsers.getKey = () => ['getAllUsers'];
