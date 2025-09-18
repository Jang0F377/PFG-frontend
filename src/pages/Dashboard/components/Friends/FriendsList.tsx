import { FC } from 'react';
import { FriendRequest } from '@custom-types/domain';
import FriendListItem from './FriendListItem';

interface FriendsListProps {
  incomingFriendRequests: FriendRequest[];
  outgoingFriendRequests: FriendRequest[];
}

type FriendListEntry = {
  id: string;
  email: string;
  direction: 'incoming' | 'outgoing';
};

const FriendsList: FC<FriendsListProps> = ({
  incomingFriendRequests,
  outgoingFriendRequests,
}) => {
  const acceptedIncoming: FriendListEntry[] = incomingFriendRequests
    .filter((fr) => fr.status === 'accepted')
    .map((fr) => ({
      id: fr.id,
      email: fr.requesterEmail,
      direction: 'incoming',
    }));

  const acceptedOutgoing: FriendListEntry[] = outgoingFriendRequests
    .filter((fr) => fr.status === 'accepted')
    .map((fr) => ({
      id: fr.id,
      email: fr.recipientEmail,
      direction: 'outgoing',
    }));

  const friends: FriendListEntry[] = [...acceptedIncoming, ...acceptedOutgoing];

  return (
    <div className="basis-1/3 rounded-lg border border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/40">
      <h2 className="text-neon-blue-900 text-md border-neon-blue-800 border-y p-1">
        Friends
      </h2>

      <ul className="divide-y-2 divide-slate-100">
        {friends.map((friend) => (
          <FriendListItem key={friend.id} friend={friend} />
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
