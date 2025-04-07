import { AppApiUrls } from '@common/utils/http/apiUrls';
import { http } from '@common/utils/http/http';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

interface PerformRegistrationRequest {
  email: string;
  password: string;
  favoriteGames?: string[];
}

export const performRegistration = async (
  email: string,
  password: string,
  favoriteGames?: string[],
) => {
  return http.post(
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
  return useMutation<any, AxiosError, PerformRegistrationRequest>({
    mutationFn: ({ email, password, favoriteGames }) =>
      performRegistration(email, password, favoriteGames),
  });
};
