import { FC } from 'react';
import Spinner from './components/Spinner';

const LoadingPage: FC = () => {
  return (
    <>
      <div className="flex h-screen w-full place-content-center">
        <Spinner size="lg" />
      </div>
    </>
  );
};

export default LoadingPage;
