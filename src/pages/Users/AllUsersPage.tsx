import { useApiGetAllUsers } from '@services/users/useApiGetAllUsers';
import LoadingPage from '@pages/Loading/Loading';
import ErrorPage from '@pages/Error/ErrorPage';
import { getIsAuthed } from '@common/utils/auth/getIsAuthed';
import DashboardHeader from '@pages/Dashboard/components/Header';
import { Container } from '@common/components/Container';
import AllUsersListItem from './components/AllUsersListItem';
import { DashboardPageFooter } from '@pages/Dashboard/components/Footer';

const AllUsersPage = () => {
  const isAuthed = getIsAuthed();
  const { data: allUsers, isLoading, isError } = useApiGetAllUsers();

  if (!isAuthed) {
    return (
      <ErrorPage
        code={401}
        message="Unauthorized"
        extraMessage="Please log in to view this page."
      />
    );
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !isAuthed) {
    return !isAuthed ? (
      <ErrorPage
        code={401}
        message="Unauthorized"
        extraMessage="Please log in to view this page."
      />
    ) : (
      <ErrorPage />
    );
  }

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen w-full">
        <header className="border-neon-blue-700 border-y py-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-neon-blue-900 text-center text-4xl font-semibold md:text-left">
              Users
            </h1>
          </div>
        </header>
        <Container className="pt-3">
          <section className="flex flex-col justify-evenly md:flex-row md:flex-wrap">
            {allUsers?.data.map((user) => (
              <AllUsersListItem key={user.id} user={user} />
            ))}
          </section>
        </Container>
      </div>
      <DashboardPageFooter />
    </>
  );
};

export default AllUsersPage;
