import { FC, Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import Button from '../Button';
import { useApiAnswerFriendRequest } from '@services/users/useApiAnswerFriendRequest';
import { queryClient } from '@common/utils/http/queryClient';
import { useApiGetCurrentUser } from '@services/dashboard/useApiGetCurrentUser';

interface RespondToFriendRequestProps {
  isOpen: boolean;
  onClose: () => void;
  requesterEmail: string;
  friendRequestId: string;
}

export const RespondToFriendRequest: FC<RespondToFriendRequestProps> = ({
  isOpen,
  onClose,
  requesterEmail,
  friendRequestId,
}) => {
  const {
    mutate: answerFriendRequest,
    isPending,
    error,
  } = useApiAnswerFriendRequest();

  const handleAnswer = (answer: 'accept' | 'decline') => {
    answerFriendRequest(
      { friendRequestId, answer },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: useApiGetCurrentUser.getKey(),
          });
          onClose();
        },
      },
    );
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-opacity-60 fixed inset-0 bg-gray-500 transition-opacity" />
        </TransitionChild>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative w-full max-w-sm transform overflow-hidden rounded-lg bg-white p-4 text-left shadow-xl transition-all">
                <h3 className="text-neon-blue-900 text-base font-medium">
                  Respond to friend request
                </h3>
                <p className="text-neon-blue-tone-200 mt-1 text-sm">
                  {`Accept friend request from ${requesterEmail}?`}
                </p>
                {error && (
                  <p className="mt-2 text-sm text-red-600">
                    {(error as any)?.response?.data?.detail?.error ||
                      'Something went wrong'}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-end gap-2">
                  <Button
                    onClick={onClose}
                    className="cursor-pointer"
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleAnswer('decline')}
                    className="cursor-pointer bg-red-600 hover:bg-red-700"
                    disabled={isPending}
                  >
                    {isPending ? 'Declining...' : 'Decline'}
                  </Button>
                  <Button
                    onClick={() => handleAnswer('accept')}
                    className="cursor-pointer bg-green-600 hover:bg-green-700"
                    disabled={isPending}
                  >
                    {isPending ? 'Accepting...' : 'Accept'}
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RespondToFriendRequest;
