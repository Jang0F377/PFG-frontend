import Button from '@common/components/Button';
import { useApiGetCurrentUser } from '@services/dashboard/userApiGetCurrentUser';
import { useState } from 'react';
import { useMachine } from '@xstate/react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@pages/Dashboard/components/Header';
import LoadingPage from '@pages/Loading/Loading';
import ErrorPage from '@pages/Error/ErrorPage';
import { useQueryClient } from '@tanstack/react-query';
import { DashboardPageFooter } from '@pages/Dashboard/components/Footer';
import { accountMachine } from './accountMachine';
import AccountForm, { AccountFormOptions } from './components/AccountForm';
import { useApiUpdateUserAccount } from '@services/account/useApiUpdateUserAccount';
import { getIsAuthed } from '@common/utils/auth/getIsAuthed';
const AccountPage = () => {
  const isAuthed = getIsAuthed();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: updateUserAccount, isError: isUpdateUserAccountError } =
    useApiUpdateUserAccount();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [state, send] = useMachine(accountMachine);
  // Leverage React Query's cache - this won't make a new network request
  // if the data is already available and fresh
  const { data: userData, isLoading, isError } = useApiGetCurrentUser();

  const handleEdit = () => {
    send({ type: 'EDITING' });
  };

  const handleCancelEditing = () => {
    send({ type: 'CANCEL_EDITING' });
  };

  const handleDoneEditing = () => {
    send({ type: 'DONE_EDITING' });
  };

  // Handle form submission
  const handleSubmit = (input: AccountFormOptions) => {
    updateUserAccount(input, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        handleDoneEditing();
      },
      onError: (error: any) => {
        handleCancelEditing();
        setErrorMessage(
          error?.response?.data?.detail?.message ||
            'An error occurred, please try again.',
        );
      },
    });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (!isAuthed || !userData) {
    return (
      <ErrorPage
        code={401}
        message="Unauthorized"
        extraMessage="Please log in to view this page."
      />
    );
  }

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen w-full bg-gray-50">
        <div className="pb-16">
          <header className="border-neon-blue-700 border-y py-1">
            <div className="mx-auto flex max-w-7xl flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
              <h1 className="text-neon-blue-900 text-center text-4xl font-semibold md:text-left">
                Account Settings
              </h1>
              {state.matches('notEditing') && (
                <Button
                  onClick={handleEdit}
                  className="bg-neon-blue-600 hover:bg-neon-blue-700"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </header>
        </div>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="my-8 rounded-lg bg-white p-6 shadow">
            {state.matches('editing') && (
              <AccountForm
                handleSubmit={handleSubmit}
                handleCancel={handleCancelEditing}
                defaultValues={{
                  email: userData.data.email,
                  username: userData.data.username,
                  favoriteGames: userData.data.favoriteGames,
                }}
              />
            )}
            {state.matches('notEditing') && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Profile Information
                  </h3>
                  <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <div className="text-sm font-medium text-gray-500">
                        Email
                      </div>
                      <div className="mt-1 text-gray-900">
                        {userData.data.email}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <div className="text-sm font-medium text-gray-500">
                        Username
                      </div>
                      <div className="mt-1 text-gray-900">
                        {userData.data.username || '-'}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Favorite Games
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {userData.data.favoriteGames &&
                    userData.data.favoriteGames.length > 0 ? (
                      userData.data.favoriteGames.map((game, index) => (
                        <span
                          key={index}
                          className="bg-neon-blue-100 inline-flex items-center rounded-full px-3 py-1"
                        >
                          <span className="text-neon-blue-800">{game}</span>
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">
                        No favorite games added
                      </span>
                    )}
                  </div>
                </div>
                {isUpdateUserAccountError && (
                  <div>
                    <p className="text-center text-red-700">{errorMessage}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      <DashboardPageFooter />
    </>
  );
};

export default AccountPage;
