import { useState } from 'react';
import { AtSymbolIcon } from '@heroicons/react/20/solid';
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LoadingPage from '../../Loading/Loading';
import CustomAvatar from '@common/components/Avatar';
import Divider from '@common/components/Divider';

import { convertMilitaryToStandard } from '@common/utils/timeUtils';
import { UpcomingSesh } from '@custom-types/domain';

interface SeshItemProps {
  /**
   * The sesh data to display
   */
  sesh: UpcomingSesh;

  /**
   * Whether this is an incoming or created sesh
   */
  type: 'incoming' | 'created';

  /**
   * Email of the sender (for incoming) or recipient (for created)
   */
  userEmail: string;

  /**
   * Optional callback for when a sesh is accepted (only for incoming)
   */
  onAccept?: (seshId: string) => Promise<void>;

  /**
   * Optional callback for when a sesh is declined (only for incoming)
   */
  onDecline?: (seshId: string) => Promise<void>;

  /**
   * Current answer status (for incoming seshes)
   */
  answer?: 'accepted' | 'declined' | 'pending';
}

/**
 * A reusable component for displaying both incoming and created sesh items
 */
const SeshItem = ({
  sesh,
  type,
  userEmail,
  onAccept,
  onDecline,
  answer = 'pending',
}: SeshItemProps) => {
  const [givenAnswer, setGivenAnswer] = useState<
    'accepted' | 'declined' | 'pending'
  >(answer);
  const [selected, setSelected] = useState('');
  const [localLoading, setLocalLoading] = useState(false);

  const confirm = 'Confirm';
  const decline = 'Decline';
  const username = userEmail ? userEmail.split('@')[0] : 'Loading';

  // Handles user clicking the confirm button
  const handleConfirmClick = () => {
    if (selected !== confirm) {
      setSelected(confirm);
    }
  };

  // Handles user clicking the decline button
  const handleDeclineClick = () => {
    if (selected !== decline) {
      setSelected(decline);
    }
  };

  // Handles submitting the user's decision
  const handleSubmitDecision = async () => {
    if (!sesh.id) return;

    setLocalLoading(true);
    try {
      if (selected === confirm && onAccept) {
        await onAccept(sesh.id);
        setGivenAnswer('accepted');
      } else if (selected === decline && onDecline) {
        await onDecline(sesh.id);
        setGivenAnswer('declined');
      }
    } catch (error) {
      console.error('Error submitting decision:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="bg-neon-blue-50 my-1 flex flex-col rounded-lg p-1">
      <header className="py-1">
        <h1 className="text-neon-blue-900 text-center text-3xl font-medium">
          Upcoming Sesh
        </h1>
        <Divider text={'From'} />
      </header>

      <div className="mx-auto mt-1 flex flex-col space-y-1">
        <CustomAvatar email={userEmail} size="md" />
        <p className="text-neon-blue-900 text-sm font-medium">{username}</p>
      </div>

      <Divider text="Details" />
      <div className="my-1 flex flex-col">
        {/* <div className=""> */}
        <div className="flex flex-row items-center justify-between">
          <label className="text-neon-blue-900 text-center text-xs">
            Game:
          </label>
          <h2 className="text-neon-blue-900 text-center text-sm">
            {sesh?.game}
          </h2>
        </div>
        <div className="flex flex-row items-center justify-between">
          <label className="text-neon-blue-900 text-center text-xs">
            Date:
          </label>
          <h2 className="text-neon-blue-900 text-center text-sm">
            {sesh?.proposedDate}
          </h2>
        </div>
        <div className="flex flex-row items-center justify-between">
          <label className="text-neon-blue-900 text-center text-xs">
            Time:
          </label>
          <h2 className="text-neon-blue-900 text-center text-sm">
            {convertMilitaryToStandard(sesh?.proposedTime)}
          </h2>
        </div>
        {/* </div> */}
      </div>

      <div className="z-20 mx-auto flex flex-col text-center">
        {/* Decision buttons - only for incoming seshes with pending status */}
        {type === 'incoming' && givenAnswer === 'pending' && (
          <div className="flex flex-col">
            <span className="mx-auto my-2 mb-4 flex rounded-md shadow-sm">
              <button
                onClick={handleConfirmClick}
                id={confirm}
                className={clsx(
                  'relative inline-flex items-center rounded-l-md px-4 py-2 text-sm font-medium',
                  selected === confirm
                    ? 'border border-white bg-green-700 text-green-50'
                    : 'border border-gray-300 bg-white text-green-700 hover:border-green-50 hover:bg-green-700 hover:text-green-50 hover:ring-1 hover:ring-green-500',
                )}
              >
                {confirm}
              </button>
              <button
                onClick={handleDeclineClick}
                id={decline}
                className={clsx(
                  'relative inline-flex items-center rounded-r-md px-4 py-2 text-sm font-medium',
                  selected === decline
                    ? 'border border-white bg-red-700 text-red-50'
                    : 'border border-gray-300 bg-white text-red-700 hover:border-red-50 hover:bg-red-700 hover:text-red-50 hover:ring-1 hover:ring-red-500',
                )}
              >
                {decline}
              </button>
            </span>
            {selected && (
              <button
                disabled={selected !== confirm && selected !== decline}
                onClick={handleSubmitDecision}
                className="bg-neon-blue-600 text-neon-blue-50 hover:bg-neon-blue-800 my-0.5 inline-block rounded-lg px-1.5 py-2 text-sm font-medium disabled:bg-gray-400"
              >
                Make Decision
              </button>
            )}
          </div>
        )}
        {/* Status badges for answered invites */}
        {type === 'incoming' && givenAnswer === 'accepted' && (
          <div className="inline-block rounded bg-green-700 px-1 py-0.5 text-sm font-medium text-green-50 md:mx-3 md:px-2 md:py-1 lg:text-base">
            {givenAnswer}
          </div>
        )}
        {type === 'incoming' && givenAnswer === 'declined' && (
          <div className="inline-block rounded bg-red-700 px-1 py-0.5 text-sm font-medium text-red-50 md:mx-3 md:px-2 md:py-1 lg:text-base">
            {givenAnswer}
          </div>
        )}
        {/* Status section - for both types */}

        <Divider text={type === 'incoming' ? 'Invited' : 'Confirmed'} />

        <div className="mx-auto my-1 flex w-full flex-row items-center justify-evenly gap-x-1.5">
          {sesh?.numAccepted && (
            <div className="flex flex-row items-center">
              <p className="text-neon-blue-900 font-medium">
                {sesh?.numAccepted}
              </p>
              <HandThumbUpIcon className="h-5 w-5 fill-green-500 text-green-800" />
            </div>
          )}

          {sesh?.numDeclined && (
            <div className="flex flex-row items-center">
              <p className="text-neon-blue-900 font-medium">
                {sesh?.numDeclined}
              </p>
              <HandThumbDownIcon className="h-5 w-5 fill-red-500 text-red-800" />
            </div>
          )}
          <div className="flex flex-row items-center">
            <p className="text-neon-blue-900 font-medium">
              {sesh?.numRecipients || 0}
            </p>
            <UserIcon className="h-5 w-5 fill-blue-500 text-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeshItem;
