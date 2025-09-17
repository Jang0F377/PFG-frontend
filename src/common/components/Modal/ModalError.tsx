import Button from '../Button';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { resolveErrorMessage } from '@common/utils/http/errorMessages';

interface ModalErrorProps {
  error: string;
  onClose: () => void;
  lottieSrc?: string;
  lottieLoop?: boolean;
  lottieSpeed?: number;
}

const ModalError = ({
  error,
  onClose,
  lottieSrc = 'https://lottie.host/106de98f-a4df-412f-8dff-3c4bcfab86aa/SmQgj9XmSf.lottie',
  lottieLoop = true,
  lottieSpeed = 1,
}: ModalErrorProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-center">
        <DotLottieReact
          src={lottieSrc}
          loop={lottieLoop}
          autoplay
          speed={lottieSpeed}
        />
      </div>
      <h3 className="text-neon-blue-900 text-base font-medium">
        Something went wrong
      </h3>
      <p className="text-sm break-words text-red-600">
        {resolveErrorMessage(error)}
      </p>
      <div className="flex justify-end">
        <Button onClick={onClose} className="cursor-pointer">
          Close
        </Button>
      </div>
    </div>
  );
};

export default ModalError;
