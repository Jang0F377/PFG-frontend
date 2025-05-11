import { urls } from '@common/utils/http/routeUrls';
import { useState } from 'react';
import pfgLogo from '@assets/PFG-702-background.png';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import {
  PerformLoginResponseData,
  useApiPerformLogin,
} from '@services/login/useApiPerformLogin';
import Spinner from '@pages/Loading/components/Spinner';
import { setIdToken, setRefreshToken } from '@common/utils/auth/tokens';
import { getIsAuthed } from '@common/utils/auth/getIsAuthed';
import useEnhancedEffect from '@common/hooks/useEnhancedEffect';

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { mutate: performLogin, isPending, isError } = useApiPerformLogin();
  const isAuthed = getIsAuthed();

  useEnhancedEffect(() => {
    if (isAuthed) {
      navigate(urls.DASHBOARD.route);
    }
  }, [isAuthed]);

  const handleSubmit = (input: { email: string; password: string }) => {
    performLogin(
      {
        email: input.email,
        password: input.password,
      },
      {
        onSuccess: ({ data }: PerformLoginResponseData) => {
          setIdToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          navigate(urls.DASHBOARD.route);
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
            Sign in to your account
          </h2>
        </div>
        <div className="mx-auto mt-8 w-full max-w-md">
          <div className="rounded-lg bg-white px-4 py-4 shadow">
            {isPending ? (
              <div>
                <Spinner />
              </div>
            ) : (
              <LoginForm handleSubmit={handleSubmit} />
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

export default LoginPage;
