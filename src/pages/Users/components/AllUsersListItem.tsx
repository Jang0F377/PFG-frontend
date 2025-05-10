import CustomAvatar from '@common/components/Avatar';
import Button from '@common/components/Button';
import Divider from '@common/components/Divider';
import { GetAllUsersResponse } from '@services/users/useApiGetAllUsers';

interface AllUsersListItemProps {
  user: GetAllUsersResponse;
}

const AllUsersListItem = ({ user }: AllUsersListItemProps) => {
  return (
    <div className="bg-neon-blue-300 m-3 mx-auto w-[18rem] justify-center rounded-lg shadow md:mx-0">
      <div className="px-3 py-4 sm:px-5">
        <header className="mx-auto flex flex-col space-y-1 text-center">
          <CustomAvatar email={user?.email} size={'md'} />
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
        <Button className="text-sm" onClick={() => {}}>
          Friend request
        </Button>
        <Button className="text-sm" onClick={() => {}}>
          Sesh invite
        </Button>
      </div>
    </div>
  );
};

export default AllUsersListItem;
