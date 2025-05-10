import { AppApiUrls } from '@common/utils/http/apiUrls';
import { http } from '@common/utils/http/http';
import { ApiResponse } from '@common/utils/http/types';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

interface ValidateRecipientEmailRequest {
  email: string;
}

export interface ValidateRecipientEmailResponse {
  recipientId?: string;
}

export type ValidateRecipientEmailResponseData =
  ApiResponse<ValidateRecipientEmailResponse>;

export const validateRecipientEmail = async (email: string) => {
  return http.post<ValidateRecipientEmailResponseData>(
    AppApiUrls.validateRecipientEmail.get({ email }),
    {},
    {
      snakecaseData: true,
      camelcaseResponse: true,
    },
  );
};

export const useApiValidateRecipientEmail = () => {
  return useMutation<
    ValidateRecipientEmailResponseData,
    AxiosError,
    ValidateRecipientEmailRequest
  >({
    mutationFn: ({ email }) => validateRecipientEmail(email),
  });
};
