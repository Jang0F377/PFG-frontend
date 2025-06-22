import Button from '@common/components/Button';
import Divider from '@common/components/Divider';
import Modal from '@common/components/Modal/Modal';
import { GetAllUsersResponse } from '@services/users/useApiGetAllUsers';
import { useState } from 'react';

interface AllUsersListItemProps {
  user: GetAllUsersResponse;
}

const AllUsersListItem = ({ user }: AllUsersListItemProps) => {
  const [isCreateSeshModalOpen, setIsCreateSeshModalOpen] = useState(false);
  const [isFriendRequestModalOpen, setIsFriendRequestModalOpen] =
    useState(false);
  const [intentRecipient, setIntentRecipient] = useState<string | undefined>(
    user.email,
  );
  console.log('user', user);

  return (
    <div className="bg-neon-blue-300 m-3 mx-auto w-[18rem] justify-center rounded-lg shadow md:mx-0">
      <div className="items-center px-3 py-4 sm:px-5">
        <header className="mx-auto flex flex-col space-y-1 text-center">
          <h1 className="text-neon-blue-900">{user?.email}</h1>
          {/* {user?.email === userEmail ? (
          <>
            <p className="text-xs text-red-600">ME</p>
          </>
        ) : (
          <div />
        )} */}
        </header>
      </div>
      <Divider text={'Info'} />

      <div className="px-2 py-2.5 sm:p-3">
        <label className="text-neon-blue-900 ml-1 block text-left text-sm font-medium">
          My Top 3:
        </label>
        {user.favoriteGames?.length ? (
          <ul className="space-y-1 text-center">
            {user.favoriteGames.map((game, idx) => (
              <li
                key={`${game}-${idx}`}
                className="bg-neon-blue-100 text-neon-blue-800 mx-auto w-1/2 items-center rounded-full py-1 text-sm"
              >
                {game}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">
            <p className="text-neon-blue-900 text-sm">
              I need to add this still!
            </p>
          </div>
        )}
      </div>
      <Divider text={'Send me a'} />
      <div className="flex justify-evenly py-3">
        <Button
          className="text-sm"
          onClick={() => {
            setIsFriendRequestModalOpen(!isFriendRequestModalOpen);
          }}
        >
          Friend request
        </Button>
        <Button
          className="text-sm"
          onClick={() => {
            setIsCreateSeshModalOpen(!isCreateSeshModalOpen);
          }}
        >
          Sesh invite
        </Button>
      </div>
      <Modal
        isOpen={isCreateSeshModalOpen}
        onClose={() => setIsCreateSeshModalOpen(!isCreateSeshModalOpen)}
        title="Create a new Sesh"
        intent="createSesh"
        intentRecipient={intentRecipient}
        intentRecipientUuid={user.id}
      />
      <Modal
        isOpen={isFriendRequestModalOpen}
        onClose={() => setIsFriendRequestModalOpen(!isFriendRequestModalOpen)}
        title="Send a friend request"
        intent="friendRequest"
        intentRecipient={intentRecipient}
        intentRecipientUuid={user.id}
      />
    </div>
  );
};

export default AllUsersListItem;
