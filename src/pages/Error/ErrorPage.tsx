import { isIdTokenExpired } from '@common/utils/auth/tokens';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ErrorPageProps {
  code?: number;
  message?: string;
  extraMessage?: string;
  linkTo?: string;
}

const DEFAULT_ERROR = {
  code: '404',
  message: 'Page not found',
  extraMessage: 'Please check your spelling and try again!',
  linkTo: '/',
};

const ErrorPage: FC<ErrorPageProps> = ({
  code = DEFAULT_ERROR.code,
  message = DEFAULT_ERROR.message,
  extraMessage = DEFAULT_ERROR.extraMessage,
  linkTo = DEFAULT_ERROR.linkTo,
}) => {
  const isAuthed = !isIdTokenExpired(); // This will return true if the token is expired

  if (isAuthed) {
    linkTo = '/dashboard';
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex-1 place-content-center space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-blue-900 sm:text-5xl md:text-8xl">
          {code}
        </h1>
        <p className="mt-2 text-xl text-black sm:text-2xl md:text-5xl">
          {message}
        </p>
        <p className="text-xl text-blue-900 sm:text-2xl md:text-3xl">
          {extraMessage}
        </p>
        <Link
          className="text-2xl hover:underline sm:text-3xl md:text-6xl"
          to={linkTo}
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};
export default ErrorPage;
