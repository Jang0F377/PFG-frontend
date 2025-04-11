import { AppApiUrls } from '@common/utils/http/apiUrls';
import { http } from '@common/utils/http/http';
import { ApiResponse } from '@common/utils/http/types';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

interface PerformRegistrationRequest {
  email: string;
  password: string;
  favoriteGames?: string[];
}

interface RegistrationResponse {
  accessToken: string;
  refreshToken: string;
}

export type PerformRegistrationResponseData = ApiResponse<RegistrationResponse>;

export const performRegistration = async (
  email: string,
  password: string,
  favoriteGames?: string[],
) => {
  return http.post<PerformRegistrationResponseData>(
    AppApiUrls.registerUser.get(),
    {
      email,
      password,
      favoriteGames,
    },
    {
      snakecaseData: true,
      camelcaseResponse: true,
    },
  );
};

export const useApiPerformRegistration = () => {
  return useMutation<
    PerformRegistrationResponseData,
    AxiosError,
    PerformRegistrationRequest
  >({
    mutationFn: ({ email, password, favoriteGames }) =>
      performRegistration(email, password, favoriteGames),
  });
};
