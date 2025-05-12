import { AppApiUrls } from '@common/utils/http/apiUrls';
import { http } from '@common/utils/http/http';
import { ApiResponse } from '@common/utils/http/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface SendSeshDecisionRequest {
  seshId: string;
  decision: 'accepted' | 'declined';
}

export interface SendSeshDecisionResponse {
  status: 'accepted' | 'declined';
}

export type SendSeshDecisionResponseData =
  ApiResponse<SendSeshDecisionResponse>;

export const sendSeshDecision = async (data: SendSeshDecisionRequest) => {
  return http.post<SendSeshDecisionResponseData>(
    AppApiUrls.sendSeshDecision.get({
      seshId: data.seshId,
      decision: data.decision,
    }),
    {},
    {
      snakecaseData: true,
      camelcaseResponse: true,
    },
  );
};

export const useApiSendSeshDecision = () => {
  return useMutation<
    SendSeshDecisionResponseData,
    AxiosError,
    SendSeshDecisionRequest
  >({
    mutationFn: (data: SendSeshDecisionRequest) => sendSeshDecision(data),
  });
};
