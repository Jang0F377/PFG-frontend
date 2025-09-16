import { useState } from 'react';
import {
  CheckIcon,
  XMarkIcon,
  UserIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Divider from '@common/components/Divider';
import { parseEmail } from '@common/utils/parseEmail';
import { Friend, FriendRequest } from '@custom-types/domain';

interface FriendItemProps {
  /**
   * The friend or friend request data to display
   */
  data: Friend | FriendRequest;

  /**
   * Whether this is a friend or friend request
   */
  type: 'friend' | 'friend-request';

  /**
   * Whether this is an incoming or outgoing friend request (only for friend-request type)
   */
  direction?: 'incoming' | 'outgoing';

  /**
   * Optional callback for when a friend request is accepted (only for incoming friend requests)
   */
  onAccept?: (requestId: string) => Promise<void>;

  /**
   * Optional callback for when a friend request is declined (only for incoming friend requests)
   */
  onDecline?: (requestId: string) => Promise<void>;

  /**
   * Optional callback for when a friend is removed
   */
  onRemoveFriend?: (friendId: string) => Promise<void>;

  /**
   * Optional callback for when an outgoing friend request is cancelled
   */
  onCancelRequest?: (requestId: string) => Promise<void>;
}

/**
 * A reusable component for displaying both friends and friend requests
 */
const FriendItem = ({
  data,
  type,
  direction = 'incoming',
  onAccept,
  onDecline,
  onRemoveFriend,
  onCancelRequest,
}: FriendItemProps) => {
  const [selected, setSelected] = useState('');
  const [localLoading, setLocalLoading] = useState(false);

  const accept = 'Accept';
  const decline = 'Decline';

  // Get display information based on type
  const getDisplayInfo = () => {
    if (type === 'friend') {
      const friend = data as Friend;
      return {
        email: friend.email,
        username: friend.username || parseEmail(friend.email),
        subtitle: 'Friend since',
        date: new Date(friend.createdAt).toLocaleDateString(),
      };
    } else {
      const request = data as FriendRequest;
      const isIncoming = direction === 'incoming';
      return {
        email: isIncoming ? request.requesterEmail : request.recipientEmail,
        username: parseEmail(
          isIncoming ? request.requesterEmail : request.recipientEmail,
        ),
        subtitle: isIncoming ? 'Sent request on' : 'Request sent on',
        date: new Date(request.createdAt).toLocaleDateString(),
      };
    }
  };

  const displayInfo = getDisplayInfo();

  // Handles user clicking the accept button
  const handleAcceptClick = () => {
    if (selected !== accept) setSelected(accept);
  };

  // Handles user clicking the decline button
  const handleDeclineClick = () => {
    if (selected !== decline) setSelected(decline);
  };

  // Handles submitting the user's decision for friend requests
  const handleSubmitDecision = async () => {
    if (type !== 'friend-request' || !onAccept || !onDecline) return;

    const request = data as FriendRequest;
    setLocalLoading(true);

    try {
      if (selected === accept) {
        await onAccept(request.id);
      } else {
        await onDecline(request.id);
      }
      // Optionally reload or update state
      window.location.reload();
    } catch (error) {
      console.error('Error handling friend request:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  // Handles removing a friend
  const handleRemoveFriend = async () => {
    if (type !== 'friend' || !onRemoveFriend) return;

    const friend = data as Friend;
    setLocalLoading(true);

    try {
      await onRemoveFriend(friend.id);
      window.location.reload();
    } catch (error) {
      console.error('Error removing friend:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  // Handles cancelling an outgoing friend request
  const handleCancelRequest = async () => {
    if (
      type !== 'friend-request' ||
      direction !== 'outgoing' ||
      !onCancelRequest
    )
      return;

    const request = data as FriendRequest;
    setLocalLoading(true);

    try {
      await onCancelRequest(request.id);
      window.location.reload();
    } catch (error) {
      console.error('Error cancelling friend request:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="bg-neon-blue-50 my-1 flex flex-col rounded-lg p-3 shadow-sm">
      <header className="py-1">
        <h1 className="text-neon-blue-900 text-center text-lg font-medium">
          {type === 'friend' ? 'Friend' : 'Friend Request'}
        </h1>
        <Divider
          text={
            type === 'friend'
              ? 'Friend'
              : direction === 'incoming'
                ? 'From'
                : 'To'
          }
        />
      </header>

      <div className="mx-auto flex flex-col items-center space-y-2">
        <div className="bg-neon-blue-100 flex h-12 w-12 items-center justify-center rounded-full">
          <UserIcon className="text-neon-blue-700 h-6 w-6" />
        </div>
        <div className="text-center">
          <p className="text-neon-blue-900 text-sm font-medium">
            {displayInfo.username}
          </p>
          <p className="text-neon-blue-600 text-xs">{displayInfo.email}</p>
        </div>
      </div>

      <Divider text="Details" />

      <div className="my-2 flex flex-col space-y-1">
        <div className="flex flex-row items-center justify-between">
          <label className="text-neon-blue-900 flex items-center text-xs">
            <ClockIcon className="mr-1 h-3 w-3" />
            {displayInfo.subtitle}:
          </label>
          <span className="text-neon-blue-900 text-sm">{displayInfo.date}</span>
        </div>

        {type === 'friend-request' && (
          <div className="flex flex-row items-center justify-between">
            <label className="text-neon-blue-900 text-xs">Status:</label>
            <span
              className={clsx(
                'rounded px-2 py-0.5 text-xs font-medium',
                (data as FriendRequest).status === 'pending' &&
                  'bg-yellow-100 text-yellow-800',
                (data as FriendRequest).status === 'accepted' &&
                  'bg-green-100 text-green-800',
                (data as FriendRequest).status === 'declined' &&
                  'bg-red-100 text-red-800',
              )}
            >
              {(data as FriendRequest).status}
            </span>
          </div>
        )}
      </div>

      <div className="z-20 mx-auto flex flex-col text-center">
        {/* Action buttons for incoming friend requests */}
        {type === 'friend-request' &&
          direction === 'incoming' &&
          (data as FriendRequest).status === 'pending' && (
            <div className="flex flex-col">
              <span className="mx-auto my-2 mb-4 flex rounded-md shadow-sm">
                <button
                  onClick={handleAcceptClick}
                  disabled={localLoading}
                  className={clsx(
                    'relative inline-flex items-center rounded-l-md px-4 py-2 text-sm font-medium',
                    selected === accept
                      ? 'border border-white bg-green-700 text-green-50'
                      : 'border border-gray-300 bg-white text-green-700 hover:border-green-50 hover:bg-green-700 hover:text-green-50 hover:ring-1 hover:ring-green-500',
                  )}
                >
                  <CheckIcon className="mr-1 h-4 w-4" />
                  {accept}
                </button>
                <button
                  onClick={handleDeclineClick}
                  disabled={localLoading}
                  className={clsx(
                    'relative inline-flex items-center rounded-r-md px-4 py-2 text-sm font-medium',
                    selected === decline
                      ? 'border border-white bg-red-700 text-red-50'
                      : 'border border-gray-300 bg-white text-red-700 hover:border-red-50 hover:bg-red-700 hover:text-red-50 hover:ring-1 hover:ring-red-500',
                  )}
                >
                  <XMarkIcon className="mr-1 h-4 w-4" />
                  {decline}
                </button>
              </span>
              {selected && (
                <button
                  onClick={handleSubmitDecision}
                  disabled={localLoading}
                  className="bg-neon-blue-600 text-neon-blue-50 hover:bg-neon-blue-800 my-1 inline-block cursor-pointer rounded-lg px-3 py-2 text-sm font-medium disabled:bg-gray-400"
                >
                  {localLoading ? 'Processing...' : 'Confirm Decision'}
                </button>
              )}
            </div>
          )}

        {/* Cancel button for outgoing friend requests */}
        {type === 'friend-request' &&
          direction === 'outgoing' &&
          (data as FriendRequest).status === 'pending' && (
            <button
              onClick={handleCancelRequest}
              disabled={localLoading}
              className="my-2 inline-block cursor-pointer rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-red-50 hover:bg-red-800 disabled:bg-gray-400"
            >
              {localLoading ? 'Cancelling...' : 'Cancel Request'}
            </button>
          )}

        {/* Remove friend button */}
        {type === 'friend' && (
          <button
            onClick={handleRemoveFriend}
            disabled={localLoading}
            className="my-2 inline-block cursor-pointer rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-red-50 hover:bg-red-800 disabled:bg-gray-400"
          >
            {localLoading ? 'Removing...' : 'Remove Friend'}
          </button>
        )}

        {/* Status badges for completed friend requests */}
        {type === 'friend-request' &&
          (data as FriendRequest).status === 'accepted' && (
            <div className="m-1.5 inline-block rounded bg-green-700 px-2 py-1 text-sm font-medium text-green-50">
              Request Accepted
            </div>
          )}
        {type === 'friend-request' &&
          (data as FriendRequest).status === 'declined' && (
            <div className="m-1.5 inline-block rounded bg-red-700 px-2 py-1 text-sm font-medium text-red-50">
              Request Declined
            </div>
          )}
      </div>
    </div>
  );
};

export default FriendItem;
