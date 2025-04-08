import { AppApiUrls } from '@common/utils/http/apiUrls';
import { http } from '@common/utils/http/http';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface PerformLoginRequest {
  email: string;
  password: string;
}

interface PerformLoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const performLogin = async (email: string, password: string) => {
  return http.post<PerformLoginResponse>(
    AppApiUrls.loginUser.route,
    {
      email,
      password,
    },
    {
      snakecaseData: true,
      camelcaseResponse: true,
    },
  );
};

export const useApiPerformLogin = () => {
  return useMutation<PerformLoginResponse, AxiosError, PerformLoginRequest>({
    mutationFn: ({ email, password }) => performLogin(email, password),
  });
};
