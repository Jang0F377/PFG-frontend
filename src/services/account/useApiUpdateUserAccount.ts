import { AppApiUrls } from '@common/utils/http/apiUrls';
import { http } from '@common/utils/http/http';
import { ApiResponse } from '@common/utils/http/types';
import { getUserId } from '@common/utils/auth/getUserId';
import { type AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

interface UpdateUserAccountRequest {
  email?: string;
  username?: string;
  favoriteGames?: string[];
}

interface UpdateUserAccountResponse {
  id: string;
  email: string;
  username?: string;
  favoriteGames?: string[];
  pfgSupporter: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateUserAccountResponseData =
  ApiResponse<UpdateUserAccountResponse>;

export const updateUserAccount = async (data: UpdateUserAccountRequest) => {
  const url = AppApiUrls.updateUserAccount.get({ userId: getUserId() });

  return http.put<UpdateUserAccountResponseData, UpdateUserAccountRequest>(
    url,
    data,
    {
      snakecaseData: true,
      camelcaseResponse: true,
    },
  );
};

export const useApiUpdateUserAccount = () => {
  return useMutation<
    UpdateUserAccountResponseData,
    AxiosError,
    UpdateUserAccountRequest
  >({
    mutationFn: updateUserAccount,
  });
};
