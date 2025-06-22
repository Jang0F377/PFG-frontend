import { AppApiUrls } from '@common/utils/http/apiUrls';
import { http } from '@common/utils/http/http';
import { ApiResponse } from '@common/utils/http/types';
import { CreatedSesh } from '@custom-types/domain';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

interface CreateSeshRequest {
  game: string;
  proposedDate: string;
  proposedTime: string;
  recipients: string[];
  notes?: string;
}

export interface CreateSeshResponse {
  sesh: CreatedSesh;
}

export type CreateSeshResponseData = ApiResponse<CreateSeshResponse>;

export const createSesh = async (data: CreateSeshRequest) => {
  return http.post<CreateSeshResponseData, CreateSeshRequest>(
    AppApiUrls.createSesh.get(),
    data,
    {
      snakecaseData: true,
      camelcaseResponse: true,
    },
  );
};

export const useApiCreateSesh = () => {
  return useMutation<CreateSeshResponseData, AxiosError, CreateSeshRequest>({
    mutationFn: createSesh,
  });
};
