import { useState } from 'react';
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Divider from '@common/components/Divider';

import { convertMilitaryToStandard } from '@common/utils/timeUtils';
import { useApiSendSeshDecision } from '@services/dashboard/useApiSendDecision';

interface SeshItemProps {
  /**
   * The sesh data to display
   */
  sesh: Record<string, any>;

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
  answer?: 'accepted' | 'declined' | 'invited';
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
  answer,
}: SeshItemProps) => {
  const [givenAnswer, setGivenAnswer] = useState<
    'accepted' | 'declined' | 'invited' | undefined
  >(answer);
  const [selected, setSelected] = useState('');
  const [localLoading, setLocalLoading] = useState(false);

  const accept = 'Accept';
  const decline = 'Decline';
  const username = userEmail ? userEmail.split('@')[0] : 'Loading';
  const { mutate: sendSeshDecision, isPending: isSendingDecision } =
    useApiSendSeshDecision();

  // Handles user clicking the confirm button
  const handleConfirmClick = () => {
    if (selected !== accept) setSelected(accept);
  };

  // Handles user clicking the decline button
  const handleDeclineClick = () => {
    if (selected !== decline) setSelected(decline);
  };

  // Handles submitting the user's decision
  const handleSubmitDecision = async () => {
    console.log('handleSubmitDecision', sesh.seshId, selected);
    if (!sesh.seshId) return;

    setLocalLoading(true);
    sendSeshDecision(
      {
        seshId: sesh.seshId,
        decision: selected === accept ? 'accepted' : 'declined',
      },
      {
        onSuccess: () => {
          setLocalLoading(false);
          window.location.reload();
        },
        onError: () => {
          setLocalLoading(false);
        },
      },
    );
  };

  return (
    <div className="bg-neon-blue-50 my-1 flex flex-col rounded-lg p-1">
      <header className="py-1">
        <h1 className="text-neon-blue-900 text-center text-3xl font-medium">
          Upcoming Sesh
        </h1>
        <Divider text={'From'} />
      </header>

      <div className="mx-auto flex flex-col items-center space-y-1">
        {/* <CustomAvatar email={sesh.seshCreatedByEmail} size="md" /> */}
        <p className="text-neon-blue-900 text-sm font-medium">
          {sesh.seshCreatedByEmail}
        </p>
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
        {type === 'incoming' && givenAnswer === 'invited' && (
          <div className="flex flex-col">
            <span className="mx-auto my-2 mb-4 flex rounded-md shadow-sm">
              <button
                onClick={handleConfirmClick}
                id={accept}
                className={clsx(
                  'relative inline-flex items-center rounded-l-md px-4 py-2 text-sm font-medium',
                  selected === accept
                    ? 'border border-white bg-green-700 text-green-50'
                    : 'border border-gray-300 bg-white text-green-700 hover:border-green-50 hover:bg-green-700 hover:text-green-50 hover:ring-1 hover:ring-green-500',
                )}
              >
                {accept}
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
                onClick={handleSubmitDecision}
                className="bg-neon-blue-600 text-neon-blue-50 hover:bg-neon-blue-800 my-1 inline-block cursor-pointer rounded-lg px-1.5 py-2 text-sm font-medium disabled:bg-gray-400"
              >
                Make Decision
              </button>
            )}
          </div>
        )}
        {/* Status badges for answered invites */}
        {type === 'incoming' && givenAnswer === 'accepted' && (
          <div className="m-1.5 inline-block rounded bg-green-700 px-1 py-0.5 text-sm font-medium text-green-50 md:px-2 md:py-1 lg:text-base">
            {givenAnswer}
          </div>
        )}
        {type === 'incoming' && givenAnswer === 'declined' && (
          <div className="m-1.5 inline-block rounded bg-red-700 px-1 py-0.5 text-sm font-medium text-red-50 md:px-2 md:py-1 lg:text-base">
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
