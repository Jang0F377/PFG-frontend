import { FC } from 'react';
import Avatar from '../../../../common/components/Avatar';

export interface FriendListItemProps {
  friend: {
    id: string;
    email: string;
    direction: 'incoming' | 'outgoing';
  };
}

const FriendListItem: FC<FriendListItemProps> = ({ friend }) => {
  return (
    <li className="text-neon-blue-900 hover:text-neon-blue-50 items-center p-3 transition hover:bg-slate-800/50 sm:p-4">
      <div className="text-center">
        <p className="text-md font-medium">{friend.email}</p>
      </div>
    </li>
  );
};

export default FriendListItem;
