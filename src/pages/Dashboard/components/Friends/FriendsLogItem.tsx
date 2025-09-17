import { FriendRequest } from '@custom-types/domain';
import { FC } from 'react';

export interface FriendsLogItemProps {
  friendRequest: FriendRequest;
  type: 'incoming' | 'outgoing';
}

const FriendsLogItem: FC<FriendsLogItemProps> = ({ friendRequest, type }) => {
  const formatMessage = (): string => {
    if (friendRequest.status === 'pending') {
      return type === 'incoming'
        ? `${friendRequest.recipientEmail} sent you a friend request`
        : `You sent a friend request to ${friendRequest.recipientEmail}`;
    } else if (friendRequest.status === 'accepted') {
      return type === 'incoming'
        ? `${friendRequest.recipientEmail} accepted your friend request`
        : `You accepted a friend request from ${friendRequest.recipientEmail}`;
    } else if (friendRequest.status === 'declined') {
      return type === 'incoming'
        ? `${friendRequest.recipientEmail} declined your friend request`
        : `You declined a friend request from ${friendRequest.recipientEmail}`;
    }

    return 'Friend activity updated';
  };

  const message = formatMessage();

  return (
    <li className="flex items-center gap-3 rounded-md p-3 transition hover:bg-slate-50 sm:p-4 dark:hover:bg-slate-800/50">
      <span className="bg-neon-blue-700 h-2 w-2 flex-shrink-0 rounded-full" />
      <p className="text-neon-blue-50 text-sm">{message}</p>
    </li>
  );
};

export default FriendsLogItem;
