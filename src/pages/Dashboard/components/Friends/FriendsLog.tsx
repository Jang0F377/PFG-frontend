import { FC } from 'react';
import { FriendRequest } from '@custom-types/domain';
import FriendsLogItem from './FriendsLogItem';

interface FriendsLogProps {
  incomingFriendRequests: FriendRequest[];
  outgoingFriendRequests: FriendRequest[];
}

const FriendsLog: FC<FriendsLogProps> = ({
  incomingFriendRequests,
  outgoingFriendRequests,
}) => {
  return (
    <div className="basis-2/3 rounded-lg border border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/40">
      <h2 className="text-neon-blue-900 text-md border-neon-blue-800 border-y p-1">
        Log
      </h2>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {incomingFriendRequests.map((friendRequest) => (
          <FriendsLogItem
            key={friendRequest.id}
            friendRequest={friendRequest}
            type="incoming"
          />
        ))}
        {outgoingFriendRequests.map((friendRequest) => (
          <FriendsLogItem
            key={friendRequest.id}
            friendRequest={friendRequest}
            type="outgoing"
          />
        ))}
      </ul>
    </div>
  );
};

export default FriendsLog;
