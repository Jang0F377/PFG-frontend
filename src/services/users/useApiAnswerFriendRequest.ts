import { AppApiUrls } from '@common/utils/http/apiUrls';
import { http } from '@common/utils/http/http';
import { ApiResponse } from '@common/utils/http/types';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

interface AnswerFriendRequestProps {
  friendRequestId: string;
  answer: 'accept' | 'decline';
}

interface AnswerFriendRequestBody {
  answer: 'accept' | 'decline';
}

export interface AnswerFriendRequestResponse {
  id: string;
  recipientId: string;
  recipientEmail: string;
  requesterId: string;
  requesterEmail: string;
  createdAt: string;
  updatedAt?: string;
  status: 'pending' | 'accepted' | 'declined';
}

export type AnswerFriendRequestResponseData =
  ApiResponse<AnswerFriendRequestResponse>;

export const answerFriendRequest = async (data: AnswerFriendRequestProps) => {
  return http.post<AnswerFriendRequestResponseData, AnswerFriendRequestBody>(
    AppApiUrls.answerFriendRequest.get({
      friendRequestId: data.friendRequestId,
    }),
    {
      answer: data.answer,
    },
    {
      snakecaseData: true,
      camelcaseResponse: true,
    },
  );
};

export const useApiAnswerFriendRequest = () => {
  return useMutation<
    AnswerFriendRequestResponseData,
    AxiosError,
    AnswerFriendRequestProps
  >({
    mutationFn: answerFriendRequest,
  });
};
