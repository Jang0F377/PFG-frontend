import { AppApiUrls } from '@common/utils/http/apiUrls';
import { http } from '@common/utils/http/http';
import { ApiResponse } from '@common/utils/http/types';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

interface CreateFriendRequest {
  recipientId: string;
  requesterId: string;
}

export interface CreateFriendRequestResponse {
  id: string;
  recipientId: string;
  requesterId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  updatedAt?: string;
}

export type CreateFriendRequestResponseData =
  ApiResponse<CreateFriendRequestResponse>;

export const sendFriendRequest = async (data: CreateFriendRequest) => {
  return http.post<CreateFriendRequestResponseData, CreateFriendRequest>(
    AppApiUrls.sendFriendRequest.get(),
    data,
    {
      snakecaseData: true,
      camelcaseResponse: true,
    },
  );
};

export const useApiSendFriendRequest = () => {
  return useMutation<
    CreateFriendRequestResponseData,
    AxiosError,
    CreateFriendRequest
  >({
    mutationFn: sendFriendRequest,
  });
};
