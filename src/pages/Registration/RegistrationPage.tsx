import pfgLogo from '@assets/PFG-702-background.png';
import SignUpForm from './components/SignUpForm';
import {
  PerformRegistrationResponse,
  useApiPerformRegistration,
} from '@services/registration/useApiPerformRegistration';
import Spinner from '@pages/Loading/components/Spinner';
import { useNavigate } from 'react-router-dom';
import { urls } from '@common/utils/http/routeUrls';
import { useState } from 'react';
import { setIdToken, setRefreshToken } from '@common/utils/auth/tokens';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    mutate: performRegistration,
    isPending,
    isError,
  } = useApiPerformRegistration();

  const handleSubmit = (data: any) => {
    performRegistration(
      {
        email: data.email,
        password: data.password,
        favoriteGames: data.favoriteGames,
      },
      {
        onSuccess: ({ data }: PerformRegistrationResponse) => {
          setIdToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          navigate(urls.DASHBOARD.route, { replace: true });
        },
        onError: (error: any) => {
          setErrorMessage(
            error?.response?.data?.detail?.message || 'An error occurred',
          );
        },
      },
    );
  };

  return (
    <>
      <div className="bg-neon-blue-700 absolute inset-0 flex flex-col justify-center overflow-hidden rounded-lg border border-t border-black px-6 py-6">
        <div className="">
          <img
            className="mx-auto h-auto w-30 overflow-hidden rounded sm:w-40 md:w-50"
            src={pfgLogo}
            alt="ERR"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-blue-100">
            Create your account
          </h2>
        </div>
        <div className="mx-auto mt-8 w-full max-w-md">
          <div className="rounded-lg bg-white px-4 py-4 shadow">
            {isPending ? (
              <div>
                <Spinner />
              </div>
            ) : (
              <SignUpForm handleSubmit={handleSubmit} />
            )}
            {isError && (
              <div>
                <p className="text-center text-red-700">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
