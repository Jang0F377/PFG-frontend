import { Fragment, ReactNode, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {
  MinusCircleIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import LoadingPage from '../../../pages/Loading/Loading';
import { useMachine } from '@xstate/react';
import { ModalInput, modalMachine } from './modalMachine';
import { NewSeshForm } from './NewSeshForm';
import { fromPromise } from 'xstate';

/**
 * The status of the modal operation
 */
export type ModalStatus = 'idle' | 'loading' | 'success' | 'error';

interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Handler for closing the modal
   */
  onClose: () => void;

  /**
   * Title of the modal
   */
  title: string;

  /**
   * Optional subtitle/description
   */
  description?: string;

  /**
   * The intent of the modal
   */
  intent?: 'createSesh' | 'friendRequest';

  /**
   * Current status of modal operation
   */
  status?: ModalStatus;

  /**
   * Success message to show when status is 'success'
   */
  successMessage?: string;

  /**
   * Error message to show when status is 'error'
   */
  errorMessage?: string;

  /**
   * Loading message to show when status is 'loading'
   */
  loadingMessage?: string;

  /**
   * Handler for the close action when in success/error state
   */
  onStatusClose?: () => void;

  /**
   * Optional additional class name for the dialog panel
   */
  panelClassName?: string;
}

/**
 * A reusable modal component that can be used for various purposes
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  intent = 'createSesh',
  status = 'idle',
  successMessage = 'Operation completed successfully',
  errorMessage = 'An error occurred',
  loadingMessage = 'Loading...',
  onStatusClose,
  panelClassName = 'sm:max-w-xl',
}: ModalProps) => {
  // Prevent the modal from closing when in loading state
  const handleClose = status === 'loading' ? () => {} : onClose;

  // Determine if we need to show status content instead of normal content
  const showStatusContent = status !== 'idle';
  const [recipients, setRecipients] = useState<string[]>([]);

  const [state, send] = useMachine(modalMachine, {
    input: {
      isOpen,
      recipients,
      intent,
    },
  });

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={() => {}}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-opacity-75 fixed inset-0 bg-gray-500 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={`relative transform overflow-hidden rounded-lg bg-white px-2 py-3 text-left shadow-xl transition-all sm:my-8 sm:w-full ${panelClassName}`}
              >
                {showStatusContent ? (
                  <div className="z-20 mx-1 flex-col rounded-lg md:mx-auto lg:relative lg:w-[490px]">
                    {status === 'loading' ? (
                      <>
                        <section className="bg-neon-blue-100 space-y-6 rounded-t-lg px-4 py-7 sm:px-6 lg:py-6">
                          <h3 className="animate-pulse text-center text-lg leading-6 font-medium text-blue-600">
                            {loadingMessage}
                          </h3>
                          <LoadingPage />
                        </section>
                        <hr className="border-neon-blue-700 w-full" />
                        <section className="bg-neon-blue-100 flex items-center justify-end space-x-6 rounded-b-md px-4 py-7 sm:px-6 lg:py-6">
                          <button
                            onClick={onStatusClose || onClose}
                            className="text-neon-blue-50 inline-block rounded-md bg-red-600 px-2 py-2.5 hover:bg-red-800"
                          >
                            Close
                          </button>
                        </section>
                      </>
                    ) : (
                      <>
                        <section className="bg-neon-blue-100 space-y-6 rounded-t-lg px-4 py-7 sm:px-6 lg:py-6">
                          <div>
                            <h3 className="text-center text-lg leading-6 font-medium text-green-700">
                              {status === 'success'
                                ? successMessage
                                : errorMessage}
                            </h3>
                          </div>
                        </section>
                        <section className="bg-neon-blue-100 space-y-4 px-4 pb-5 sm:px-6">
                          {status === 'success' ? (
                            <ShieldCheckIcon
                              className="animate-custom-spin mx-auto rounded-full bg-green-700 md:w-40"
                              color="black"
                            />
                          ) : (
                            <ShieldExclamationIcon
                              className="animate-custom-spin mx-auto rounded-full bg-red-700 md:w-40"
                              color="black"
                            />
                          )}
                        </section>
                        <hr className="border-neon-blue-700 w-full" />
                        <section className="bg-neon-blue-100 flex items-center justify-end space-x-6 rounded-b-md px-4 py-7 sm:px-6 lg:py-6">
                          <button
                            onClick={onStatusClose || onClose}
                            className="text-neon-blue-50 inline-block rounded-md bg-red-600 px-2 py-2.5 hover:bg-red-800"
                          >
                            Close
                          </button>
                        </section>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="z-20 mx-1 flex-col rounded-lg md:mx-auto lg:relative lg:w-[490px]">
                    <section className="bg-neon-blue-100 space-y-6 rounded-t-lg px-1.5 py-3">
                      <div>
                        <h3 className="text-neon-blue-900 text-base leading-6 font-medium md:text-lg">
                          {title}
                        </h3>
                        {description && (
                          <p className="text-neon-blue-tone-200 mt-0.5 text-xs">
                            {description}
                          </p>
                        )}
                      </div>
                      {recipients.length > 0 && (
                        <div className="bg-neon-blue-100 space-y-1 rounded-t-lg px-1 py-2">
                          <h3 className="text-neon-blue-900 text-sm leading-6 font-medium">
                            Recipients
                          </h3>
                          <ul>
                            {recipients.map((recipient) => (
                              <li
                                key={recipient}
                                className="flex flex-row items-center justify-between"
                              >
                                <span className="text-sm">{recipient}</span>
                                <MinusCircleIcon
                                  onClick={() => {
                                    // TODO: Remove recipient
                                  }}
                                  className="h-4 w-4 text-red-500"
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {intent === 'createSesh' && (
                        <NewSeshForm
                          handleAddValidRecipient={(recipient) => {
                            setRecipients([...recipients, recipient]);
                            send({ type: 'ADD_RECIPIENT', payload: recipient });
                          }}
                          handleSubmit={() => {
                            console.log('handleSubmit');
                            send({ type: 'CREATE_SESH' });
                          }}
                          handleCancel={() => {}}
                          defaultValues={{
                            gameName: '',
                            gameTime: '',
                            gameDate: '',
                          }}
                          validatedRecipients={recipients}
                        />
                      )}
                    </section>
                    <hr className="border-neon-blue-700 w-full" />
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
