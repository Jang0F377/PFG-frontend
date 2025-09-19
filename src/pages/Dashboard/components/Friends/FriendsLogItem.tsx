import { FriendRequest } from '@custom-types/domain';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { FC, useState } from 'react';
import RespondToFriendRequest from '@common/components/Modal/RespondToFriendRequest';

export interface FriendsLogItemProps {
  friendRequest: FriendRequest;
  type: 'incoming' | 'outgoing';
  clickable?: boolean;
}

const FriendsLogItem: FC<FriendsLogItemProps> = ({
  friendRequest,
  type,
  clickable = false,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formatMessage = (): string => {
    if (friendRequest.status === 'pending') {
      return type === 'incoming'
        ? `${friendRequest.requesterEmail} sent you a friend request`
        : `You sent a friend request to ${friendRequest.recipientEmail}`;
    } else if (friendRequest.status === 'accepted') {
      return type === 'incoming'
        ? `You accepted a friend request from ${friendRequest.requesterEmail}`
        : `${friendRequest.recipientEmail} accepted your friend request`;
    } else if (friendRequest.status === 'declined') {
      return type === 'incoming'
        ? `${friendRequest.requesterEmail} declined your friend request`
        : `You declined a friend request from ${friendRequest.recipientEmail}`;
    }

    return 'Friend activity updated';
  };

  const message = formatMessage();

  return (
    <li
      className={clsx(
        'hover:bg-neon-blue-50 dark:hover:bg-neon-blue-800/50 flex items-center gap-3 p-3 transition sm:p-4',
        clickable && 'cursor-pointer',
      )}
      onClick={clickable ? () => setIsDialogOpen(true) : undefined}
    >
      <span className="bg-neon-blue-700 h-2 w-2 flex-shrink-0 rounded-full" />
      <p className="text-neon-blue-50 text-sm">{message}</p>
      {clickable && (
        <ExclamationCircleIcon className="text-neon-blue-700 h-5 w-5 basis-1/4" />
      )}
      {clickable && (
        <RespondToFriendRequest
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          requesterEmail={friendRequest.requesterEmail}
          friendRequestId={friendRequest.id}
        />
      )}
    </li>
  );
};

export default FriendsLogItem;
