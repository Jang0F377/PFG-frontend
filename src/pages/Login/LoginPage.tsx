import { urls } from '@common/utils/http/routeUrls';
import { useState } from 'react';
import pfgLogo from '@assets/PFG-702-background.png';

const LoginPage = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [extraMessage, setExtraMessage] = useState('');

  return (
    <>
      <div className="bg-neon-blue-700 flex min-h-full flex-col justify-center overflow-hidden border border-t border-black py-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-auto w-30 overflow-hidden rounded"
            src={pfgLogo}
            alt="ERR"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-blue-100">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            {error ? (
              <div>
                <p className="text-center text-sm text-red-700">
                  {errorMessage}
                </p>
                <p className="text-center text-sm text-red-700">
                  {extraMessage}
                </p>
              </div>
            ) : (
              <div />
            )}
            <p className="mt-10 text-center text-sm text-gray-700">
              Not a member?{' '}
              <a
                href={urls.REGISTRATION.route}
                className="text-neon-blue-600 hover:text-neon-blue-500 leading-6 font-semibold"
              >
                Register Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
