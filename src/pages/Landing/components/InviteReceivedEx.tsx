import { TypeAnimation } from 'react-type-animation';
import { AtSymbolIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import clsx from 'clsx';
import CustomDivider from '@common/components/Divider';
import CustomAvatar from '@common/components/Avatar';

export const ConfirmOrDeclineButtons = () => {
  const confirm = 'Confirm';
  const decline = 'Decline';
  const [selected, setSelected] = useState(confirm);
  const handleConfirmClick = () => {
    if (selected !== confirm) {
      setSelected(confirm);
    } else {
      return;
    }
  };
  const handleDeclineClick = () => {
    if (selected !== decline) {
      setSelected(decline);
    } else {
      return;
    }
  };
  return (
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
      {selected === decline ? (
        <p className="mx-auto text-center text-sm text-red-700">
          Upon declining you&apos;ll be able to offer a time that better suits
          you!
        </p>
      ) : null}
    </div>
  );
};

const InvitedGroupAvatars = () => {
  return (
    <div className="isolate mx-auto flex justify-center -space-x-2 overflow-hidden">
      <span className="relative inline-block">
        <img
          className="ring-neon-blue-50 relative z-20 inline-block h-10 w-10 rounded-full ring-1"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <span className="absolute right-0 bottom-0 z-20 block h-2.5 w-2.5 rounded-full bg-green-400 ring-1 ring-white" />
      </span>
      <span className="relative inline-block">
        <img
          className="ring-neon-blue-50 relative z-10 inline-block h-10 w-10 rounded-full ring-1"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt=""
        />
        <span className="absolute right-0 bottom-0 z-10 block h-2.5 w-2.5 rounded-full bg-green-400 ring-1 ring-white" />
      </span>
      <span className="relative inline-block">
        <img
          className="ring-neon-blue-50 relative z-0 inline-block h-10 w-10 rounded-full ring-1"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <span className="absolute right-0 bottom-0 z-0 block h-2.5 w-2.5 rounded-full bg-red-400 ring-1 ring-white" />
      </span>
    </div>
  );
};

const InviteReceivedEx = () => {
  return (
    <div className="z-20 mx-1 rounded-lg md:mx-auto lg:relative lg:w-[490px]">
      <section className="bg-neon-blue-100 relative flex flex-col justify-center space-y-3 rounded-t-lg px-4 py-3">
        <p className="absolute top-2 right-2 text-xs">
          Received {new Date().toLocaleDateString()}
        </p>
        <h1 className="text-neon-blue-900 text-center text-3xl font-medium">
          Sesh Invite
        </h1>
        <CustomDivider text={'From'} />
        <div className="z-20 mx-auto flex flex-col space-y-1">
          <CustomAvatar email="me" size={'md'} />
          <p className="text-neon-blue-900 text-sm font-medium">PLANET_SNIPS</p>
        </div>
        <h3 className="text-neon-blue-900 text-center text-base">
          Lets play some{' '}
          <TypeAnimation
            sequence={[
              'Apex Legends',
              1100,
              'Destiny 2',
              1100,
              'CoD: Warzone',
              1100,
              'Overwatch',
              1100,
              'RS6: Siege',
              1100,
              'Whatever you chose!',
              1000,
            ]}
            repeat={Infinity}
          />
        </h3>
        <CustomDivider text={'When'} />
      </section>
      <section className="bg-neon-blue-100 flex flex-col justify-center rounded-b-lg px-4 pt-1 pb-3">
        <div className="z-20 mx-auto flex flex-col text-center">
          <p className="text-neon-blue-900 text-base font-medium">
            PLANET_SNIPS
          </p>
          <p className="text-neon-blue-900 text-sm">proposes</p>
          <div className="mx-auto flex flex-col items-center justify-center space-y-2 space-x-0 md:flex-row md:space-y-0 md:space-x-3">
            <h1 className="text-neon-blue-900 flex text-lg font-medium">
              Tomorrow
            </h1>
            <AtSymbolIcon className="fill-neon-blue-600 flex w-6" />
            <h2 className="text-neon-blue-900 text-lg font-medium tracking-wide">
              08:15 PM
            </h2>
          </div>
          <ConfirmOrDeclineButtons />
        </div>
        <CustomDivider text={'Invited'} />
      </section>
      <section className="bg-neon-blue-100 flex flex-col justify-center rounded-b-lg px-4 pt-1 pb-3">
        <InvitedGroupAvatars />
      </section>
    </div>
  );
};

export default InviteReceivedEx;
