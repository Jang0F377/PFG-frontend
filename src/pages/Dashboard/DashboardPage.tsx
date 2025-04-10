import { EmptyState } from '@common/components/EmptyState';
import {
  CalendarDaysIcon,
  EnvelopeOpenIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import Friends from './components/Friends';
import DashboardHeader from './components/Header';
import { DashboardPageFooter } from './components/Footer';
import { useApiGetCurrentUser } from '@services/dashboard/userApiGetCurrentUser';
import LoadingPage from '@pages/Loading/Loading';
import ErrorPage from '@pages/Error/ErrorPage';
import { getIsAuthed } from '@common/utils/auth/getIsAuthed';

const DashboardPage = () => {
  const isAuthed = getIsAuthed();
  const { data: getCurrentUser, isLoading, isError } = useApiGetCurrentUser();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (!isAuthed) {
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
      <div id={'dashboard'} className="min-h-screen w-full bg-gray-50">
        <div className="pb-32">
          <header className="border-neon-blue-700 border-y py-1">
            <div className="mx-auto flex max-w-7xl flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
              <h1 className="text-neon-blue-900 text-center text-4xl font-semibold md:text-left">
                Dashboard
              </h1>
              <PlusCircleIcon
                onClick={() => {}}
                className="text-neon-blue-600 hover:bg-neon-blue-800 w-12 rounded-full p-1 hover:text-white"
              />
            </div>
          </header>
        </div>

        <main className="mx-3 -mt-32 space-y-3 pt-3">
          <section className="mx-auto max-w-7xl">
            <div className="bg-neon-blue-200 mx-auto items-center justify-center rounded-lg px-5 py-6 text-center sm:px-6">
              <h1 className="-mt-2 text-left text-xl font-medium">
                Upcoming Created Seshes
              </h1>
              <div className="border-neon-blue-800/50 flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-2 rounded-lg border-4">
                <EmptyState
                  message="Create your first Sesh!"
                  extraMessage={[
                    'Send a Sesh invite to someone by email.',
                    'Then your upcoming created Seshes will appear here.',
                  ]}
                  icon={
                    <CalendarDaysIcon className="text-neon-blue-700 mx-auto h-12 w-12" />
                  }
                  onClick={() => {}}
                />

                {/* {upcomingCreatedSeshes?.length ? (
                    upcomingCreatedSeshes.map((sesh, idx) => (
                      <UpcomingCreatedSeshItem
                        key={idx}
                        sesh={sesh as Sesh}
                        userObject={me as User}
                      />
                    ))
                  ) : (
                    <EmptyState handleShow={handleShowModal} />
                  )} */}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl">
            <div className="bg-neon-blue-200 mx-auto items-center justify-center rounded-lg px-5 py-6 text-center sm:px-6">
              <h1 className="-mt-2 text-left text-xl font-medium">
                Upcoming Sesh Invites
              </h1>
              <div className="border-neon-blue-800/50 flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-2 rounded-lg border-4">
                {/* {incomingSeshInvites?.length ? (
                    incomingSeshInvites.map((sesh, idx) => (
                      <IncomingSeshInviteItems
                        key={idx}
                        sesh={sesh as Sesh}
                        token={token}
                      />
                    ))
                  ) : (
                    <InviteEmptyState />
                  )} */}
                <EmptyState
                  message="No Sesh invites yet!"
                  extraMessage={'Invites you receive will appear here.'}
                  icon={
                    <EnvelopeOpenIcon className="text-neon-blue-700 mx-auto h-12 w-12" />
                  }
                  onClick={() => {}}
                />
              </div>
            </div>
          </section>
          <section className="mx-auto max-w-7xl pb-3">
            <Friends />
          </section>
        </main>
      </div>
      <DashboardPageFooter />
    </>
  );
};

export default DashboardPage;
