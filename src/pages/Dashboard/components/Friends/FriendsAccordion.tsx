import { FriendRequest } from '@custom-types/domain';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import FriendsLog from './FriendsLog';
import FriendsList from './FriendsList';

interface FriendsAccordionProps {
  receivedFriendRequests: FriendRequest[];
  sentFriendRequests: FriendRequest[];
}

const FriendsAccordion = ({
  receivedFriendRequests,
  sentFriendRequests,
}: FriendsAccordionProps) => {
  return (
    <Disclosure
      as="div"
      className="bg-neon-blue-200 mx-auto w-full max-w-2xl rounded p-1"
      defaultOpen={true}
    >
      <DisclosureButton className="flex w-full items-center justify-between">
        <span className="text-neon-blue-900 text-md font-medium">Friends</span>
        <ChevronDownIcon className="fill-neon-blue-900/60 group-data-hover:fill-neon-blue-900 size-5 group-data-open:rotate-180" />
      </DisclosureButton>
      <DisclosurePanel className="bg-neon-blue-200 flex flex-row rounded p-1">
        <FriendsLog
          incomingFriendRequests={receivedFriendRequests}
          outgoingFriendRequests={sentFriendRequests}
        />
        <FriendsList
          incomingFriendRequests={receivedFriendRequests}
          outgoingFriendRequests={sentFriendRequests}
        />
      </DisclosurePanel>
    </Disclosure>
  );
};

export default FriendsAccordion;
