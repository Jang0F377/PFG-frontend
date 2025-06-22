import { parseEmail } from '@common/utils/parseEmail';
import Button from '../Button';
import { useApiSendFriendRequest } from '@services/users/useApiSendFriendRequest';
import { getUserId } from '@common/utils/auth/getUserId';
export interface FriendRequestProps {
  recipientEmail: string;
  recipientUuid: string;
  handleSuccess: () => void;
  handleError: (error: string) => void;
  handleClose: () => void;
}

export const FriendRequest = ({
  recipientEmail,
  recipientUuid,
  handleSuccess,
  handleError,
  handleClose,
}: FriendRequestProps) => {
  const requesterUuid = getUserId();
  const { mutate: sendFriendRequest, isPending: isSendingFriendRequest } =
    useApiSendFriendRequest();

  const handleSendFriendRequest = () => {
    sendFriendRequest(
      {
        recipientId: recipientUuid,
        requesterId: requesterUuid,
      },
      {
        onSuccess: () => {
          handleSuccess();
        },
        onError: (error) => {
          handleError(error.message);
        },
      },
    );
  };

  return (
    <div>
      <h2 className="text-base">
        Would you like to send a friend request to{' '}
        <span className="font-bold underline">
          {parseEmail(recipientEmail)}
        </span>
        ?
      </h2>
      <div className="mt-3 flex flex-row justify-between">
        <Button
          onClick={handleSendFriendRequest}
          className="cursor-pointer"
          disabled={isSendingFriendRequest}
        >
          {isSendingFriendRequest ? 'Sending...' : 'Send'}
        </Button>
        <Button onClick={handleClose} className="cursor-pointer">
          Cancel
        </Button>
      </div>
    </div>
  );
};
