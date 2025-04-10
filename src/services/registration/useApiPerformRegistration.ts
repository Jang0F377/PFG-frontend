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

// Define the actual data shape
interface RegistrationResponse {
  accessToken: string;
  refreshToken: string;
}

// Use ApiResponse to wrap the data with the standard API response format
export type PerformRegistrationResponseData = ApiResponse<RegistrationResponse>;

export const performRegistration = async (
  email: string,
  password: string,
  favoriteGames?: string[],
) => {
  // The http utility will return the full response including status, data, and meta
  return http.post<PerformRegistrationResponseData>(
    AppApiUrls.registerUser.route,
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
