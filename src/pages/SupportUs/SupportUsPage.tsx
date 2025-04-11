import { getIsAuthed } from '@common/utils/auth/getIsAuthed';
import ErrorPage from '@pages/Error/ErrorPage';
import Support from '@pages/Landing/components/Support';
import DashboardHeader from '@pages/Dashboard/components/Header';
const SupportUsPage = () => {
  const isAuthed = getIsAuthed();

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
      <div className="h-fit w-full text-center">
        <header className="border-neon-blue-700 border-y py-1 md:border-y-0 md:border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-neon-blue-900 text-center text-4xl font-semibold">
              Support Us
            </h1>
          </div>
        </header>
      </div>
      <Support />
    </>
  );
};

export default SupportUsPage;
