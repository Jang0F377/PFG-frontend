import { AppApiUrls } from '@common/utils/http/apiUrls';
import { http } from '@common/utils/http/http';
import { ApiResponse } from '@common/utils/http/types';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

interface AnswerFriendRequest {
  friendRequestId: string;
  decision: 'accept' | 'decline';
  userId: string;
  friendId: string;
  friendEmail: string;
}

export interface AnswerFriendRequestResponse {
  id: string;
  userId: string;
  userEmail: string;
  friendId: string;
  friendEmail: string;
  createdAt: string;
}

export type AnswerFriendRequestResponseData =
  ApiResponse<AnswerFriendRequestResponse>;

export const answerFriendRequest = async (data: AnswerFriendRequest) => {
  return http.post<AnswerFriendRequestResponseData, AnswerFriendRequest>(
    AppApiUrls.answerFriendRequest.get({
      friendRequestId: data.friendRequestId,
      decision: data.decision,
    }),
    data,
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
    AnswerFriendRequest
  >({
    mutationFn: answerFriendRequest,
  });
};
