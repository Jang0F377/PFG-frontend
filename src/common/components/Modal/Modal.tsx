import { Fragment, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { MinusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import LoadingPage from '../../../pages/Loading/Loading';
import { useMachine } from '@xstate/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { modalMachine } from './modalMachine';
import { NewSeshForm, NewSeshSubmissionOptions } from './NewSeshForm';
import { useApiCreateSesh } from '@services/sesh/useApiCreateSesh';
import useEnhancedEffect from '@common/hooks/useEnhancedEffect';
import { FriendRequest } from './FriendRequest';

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

  intentRecipient?: string;
  intentRecipientUuid?: string;

  /**
   * Current status of modal operation
   */
  status?: ModalStatus;

  /**
   * Success message to show when status is 'success'
   */
  successMessage?: string;

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
  intentRecipient,
  intentRecipientUuid,
  intent = 'createSesh',
  status = 'idle',
  successMessage = 'Operation completed successfully',
  loadingMessage = 'Loading...',
  onStatusClose,
  panelClassName = 'sm:max-w-xl',
}: ModalProps) => {
  const [recipientsEmails, setRecipientsEmails] = useState<string[]>([]);
  const [recipientsUuids, setRecipientsUuids] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: createSesh } = useApiCreateSesh();
  const handleSubmit = (input: NewSeshSubmissionOptions) => {
    if (recipientsEmails.length === 0) {
      setErrorMessage('Please add at least one recipient');
      return;
    }
    send({ type: 'CREATING_SESH' });
    createSesh(
      {
        game: input.gameName,
        proposedDate: input.gameDate,
        proposedTime: input.gameTime,
        recipients: recipientsUuids,
        notes: input.gameNotes,
      },
      {
        onSuccess: () => {
          send({ type: 'CREATE_SUCCESS' });
        },
        onError: (error) => {
          send({ type: 'CREATE_ERROR', error: error.message });
        },
      },
    );
  };

  const [state, send] = useMachine(modalMachine);

  // Prevent the modal from closing when in loading state
  const handleClose = () => {
    setErrorMessage(null);
    setRecipientsEmails([]);
    onClose();
  };

  useEnhancedEffect(() => {
    if (state.matches('opened')) {
      send({
        type: intent === 'createSesh' ? 'CREATE_SESH' : 'FRIEND_REQUEST',
      });
    }
  }, []);

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
                {/* {showStatusContent ? (
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
                ) : ( */}
                <div className="z-20 mx-1 flex-col rounded-lg md:mx-auto">
                  <section className="bg-neon-blue-100 space-y-6 rounded-t-lg px-1.5 py-3">
                    <div>
                      <div className="flex flex-row items-center justify-between">
                        <h3 className="text-neon-blue-900 text-base leading-6 font-medium md:text-lg">
                          {state.matches('createSuccess')
                            ? 'Successfully created.'
                            : title}
                        </h3>
                        {state.matches('createSuccess') && (
                          <XMarkIcon
                            className="text-neon-blue-900 hover:bg-neon-blue-900 h-5 w-5 cursor-pointer rounded outline-1 transition-all duration-300 hover:text-white"
                            onClick={() => {
                              window.location.reload();
                            }}
                          />
                        )}
                      </div>
                      {description && (
                        <p className="text-neon-blue-tone-200 mt-0.5 text-xs">
                          {description}
                        </p>
                      )}
                    </div>
                    {state.matches('friendRequest') &&
                      intent === 'friendRequest' && (
                        <FriendRequest
                          recipientEmail={intentRecipient!}
                          recipientUuid={intentRecipientUuid!}
                          handleSuccess={() => {
                            send({ type: 'CREATE_SUCCESS' });
                          }}
                          handleError={(error) => {
                            send({ type: 'CREATE_ERROR', error });
                          }}
                          handleClose={onClose}
                        />
                      )}
                    {state.matches('createSesh') && intent === 'createSesh' && (
                      <>
                        {recipientsEmails.length > 0 && (
                          <div className="bg-neon-blue-100 rounded-t-lg px-1 py-2">
                            <h3 className="text-neon-blue-900 text-sm leading-6 font-medium underline">
                              Recipients
                            </h3>
                            <ul>
                              {recipientsEmails.map((recipient) => (
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
                        <NewSeshForm
                          handleAddValidRecipientEmail={(recipient) => {
                            setRecipientsEmails([
                              ...recipientsEmails,
                              recipient,
                            ]);
                          }}
                          handleAddValidRecipientUuid={(recipientUuid) => {
                            setRecipientsUuids([
                              ...recipientsUuids,
                              recipientUuid,
                            ]);
                          }}
                          handleSubmit={handleSubmit}
                          handleCancel={handleClose}
                          defaultValues={{
                            recipients: recipientsEmails,
                            gameName: '',
                            gameTime: '',
                            gameDate: '',
                            intentRecipient,
                          }}
                          validatedRecipients={recipientsEmails}
                        />
                      </>
                    )}
                    {state.matches('creatingSesh') && (
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
                    )}
                    {state.matches('createSuccess') && (
                      <>
                        <DotLottieReact
                          src="https://lottie.host/fe575d1b-ccb8-4d3e-af21-70b9ae08845a/gHy6Cyn3Qo.lottie"
                          speed={0.5}
                          autoplay
                        />
                      </>
                    )}
                    {state.matches('createError') && (
                      <>
                        <DotLottieReact
                          src="https://lottie.host/106de98f-a4df-412f-8dff-3c4bcfab86aa/SmQgj9XmSf.lottie"
                          loop
                          autoplay
                        />
                      </>
                    )}
                  </section>
                </div>
                {/* )} */}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
