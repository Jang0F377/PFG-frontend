import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useApiValidateRecipientEmail } from '@services/users/useApiValidateRecipientEmail';
import { useForm } from '@tanstack/react-form';
import clsx from 'clsx';
import Button from '../Button';
import { useState } from 'react';
import useEnhancedEffect from '@common/hooks/useEnhancedEffect';

export interface NewSeshSubmissionOptions extends NewSeshFormOptions {
  intentRecipient?: string;
  recipients: string[];
}

export interface NewSeshFormOptions {
  gameName: string;
  gameTime: string;
  gameDate: string;
  gameNotes?: string;
}

export interface NewSeshFormProps {
  handleSubmit: (input: NewSeshSubmissionOptions) => void;
  handleCancel: () => void;
  defaultValues: NewSeshSubmissionOptions;
  handleAddValidRecipientEmail: (recipientEmail: string) => void;
  handleAddValidRecipientUuid: (recipientUuid: string) => void;
  validatedRecipients: string[];
}

export const NewSeshForm = ({
  handleSubmit,
  handleCancel,
  defaultValues,
  handleAddValidRecipientEmail,
  handleAddValidRecipientUuid,
  validatedRecipients,
}: NewSeshFormProps) => {
  const {
    mutate: validateRecipientEmail,
    isPending: isValidateRecipientEmailPending,
    isSuccess: isValidateRecipientEmailSuccess,
  } = useApiValidateRecipientEmail();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [addRecipientError, setAddRecipientError] = useState<boolean>(false);

  const handleValidateSubmit = (input: NewSeshAddRecipientFormOptions) => {
    validateRecipientEmail(
      { email: input.recipientEmail },
      {
        onSuccess: (response) => {
          if (!response.data) {
            console.log('User not found by email ', input.recipientEmail);
            setErrorMessage('User not found by email ' + input.recipientEmail);
            setAddRecipientError(true);
          } else {
            handleAddValidRecipientEmail(input.recipientEmail);
            handleAddValidRecipientUuid(response.data?.recipientId!);
          }
        },
        onError: (error: any) => {
          console.log('onError', error);
        },
      },
    );
  };

  const newSeshForm = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      handleSubmit(value);
    },
    validators: {
      onSubmit: ({ value }) => {
        if (!value.gameName) {
          return {
            fields: {
              gameName: 'Game name is required',
            },
          };
        }
        if (!value.gameDate) {
          return {
            fields: {
              gameDate: 'Game date is required',
            },
          };
        }
        if (!value.gameTime) {
          return {
            fields: {
              gameTime: 'Game time is required',
            },
          };
        }
        return null;
      },
    },
  });

  const handleClose = () => {
    setErrorMessage(null);
    setAddRecipientError(false);
    newSeshForm.reset();
    handleCancel();
  };

  useEnhancedEffect(() => {
    if (addRecipientError) {
      setTimeout(() => {
        setAddRecipientError(false);
      }, 1500);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [addRecipientError]);

  return (
    <>
      <NewSeshAddRecipientForm
        handleSubmit={handleValidateSubmit}
        defaultValues={{
          recipientEmail: defaultValues.intentRecipient ?? '',
        }}
        isValidateRecipientEmailPending={isValidateRecipientEmailPending}
        isValidateRecipientEmailSuccess={isValidateRecipientEmailSuccess}
        validatedRecipients={validatedRecipients}
        addRecipientError={addRecipientError}
      />
      {errorMessage && (
        <div className="text-sm text-red-500">{errorMessage}</div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          newSeshForm.handleSubmit();
        }}
      >
        <newSeshForm.Field
          name="gameName"
          children={(field) => (
            <div className="max-w-xl">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Game
              </label>
              <div className="mt-1">
                <input
                  id={field.name}
                  type="text"
                  placeholder={defaultValues.gameName}
                  name={field.name}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  className="bg-neon-blue-50 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                />
                {field.state.meta.errors.length > 0 ? (
                  <em role="alert" className="text-red-500">
                    {field.state.meta.errors.join(', ')}
                  </em>
                ) : null}
              </div>
            </div>
          )}
        />
        <div className="flex flex-row gap-x-1 sm:justify-between sm:gap-0">
          <newSeshForm.Field
            name="gameDate"
            children={(field) => (
              <div className="max-w-xl">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <div className="mt-1">
                  <input
                    id={field.name}
                    type="date"
                    placeholder={defaultValues.gameDate}
                    name={field.name}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    className="bg-neon-blue-50 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                  />
                  {field.state.meta.errors.length > 0 ? (
                    <em role="alert" className="text-red-500">
                      {field.state.meta.errors.join(', ')}
                    </em>
                  ) : null}
                </div>
              </div>
            )}
          />
          <newSeshForm.Field
            name="gameTime"
            children={(field) => (
              <div className="max-w-xl">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  Time
                </label>
                <div className="mt-1">
                  <input
                    id={field.name}
                    type="time"
                    placeholder={defaultValues.gameTime}
                    name={field.name}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    className="bg-neon-blue-50 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                  />
                  {field.state.meta.errors.length > 0 ? (
                    <em role="alert" className="text-red-500">
                      {field.state.meta.errors.join(', ')}
                    </em>
                  ) : null}
                </div>
              </div>
            )}
          />
        </div>
        <newSeshForm.Field
          name="gameNotes"
          children={(field) => (
            <div className="max-w-xl">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Notes
              </label>
              <div className="mt-1">
                <textarea
                  id={field.name}
                  placeholder={defaultValues.gameNotes ?? ''}
                  name={field.name}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  className="bg-neon-blue-50 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                />
                {field.state.meta.errors.length > 0 ? (
                  <em role="alert" className="text-red-500">
                    {field.state.meta.errors.join(', ')}
                  </em>
                ) : null}
              </div>
            </div>
          )}
        />
        <newSeshForm.Subscribe
          selector={(state) => [state.errorMap]}
          children={([errorMap]) =>
            errorMap.onSubmit ? (
              <div>
                <em>There was an error on the form: {errorMap.onSubmit}</em>
              </div>
            ) : null
          }
        />
        <div className="flex flex-row justify-between">
          <newSeshForm.Subscribe
            selector={(state) => [state.canSubmit]}
            children={([canSubmit]) => (
              <Button type="submit" disabled={!canSubmit} className="mt-3">
                Create Sesh
              </Button>
            )}
          />
          <newSeshForm.Subscribe
            selector={(state) => [state.isSubmitting]}
            children={([isSubmitting]) => (
              <Button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="mt-3 hover:bg-red-600"
              >
                {isSubmitting ? '...' : 'Cancel'}
              </Button>
            )}
          />
        </div>
      </form>
    </>
  );
};

interface NewSeshAddRecipientFormOptions {
  intentRecipient?: string;
  recipientEmail: string;
}

interface NewSeshAddRecipientFormProps {
  defaultValues: NewSeshAddRecipientFormOptions;
  handleSubmit: (input: NewSeshAddRecipientFormOptions) => void;
  isValidateRecipientEmailPending: boolean;
  isValidateRecipientEmailSuccess: boolean;
  addRecipientError: boolean;
  validatedRecipients: string[];
}

const NewSeshAddRecipientForm = ({
  defaultValues,
  handleSubmit,
  isValidateRecipientEmailPending,
  isValidateRecipientEmailSuccess,
  addRecipientError,
  validatedRecipients,
}: NewSeshAddRecipientFormProps) => {
  const newSeshAddRecipientForm = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      handleSubmit(value);
    },
    validators: {
      onSubmit: ({ value }) => {
        if (!value.recipientEmail) {
          return {
            fields: {
              recipientEmail: 'Recipient email is required',
            },
          };
        }
        if (validatedRecipients.includes(value.recipientEmail)) {
          return {
            fields: {
              recipientEmail: 'Recipient email is already in the list',
            },
          };
        }
        return null;
      },
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        newSeshAddRecipientForm.handleSubmit();
      }}
    >
      <newSeshAddRecipientForm.Field
        name="recipientEmail"
        children={(field) => (
          <div className="max-w-xl">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              Recipient Email
            </label>
            {validatedRecipients.length == 0 && (
              <p className="text-xs">Add recipients first.</p>
            )}
            <div className="mt-1 flex flex-row items-center justify-between space-x-2">
              <input
                id={field.name}
                type="email"
                placeholder={defaultValues.recipientEmail}
                name={field.name}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
                className="bg-neon-blue-50 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
              />
              <newSeshAddRecipientForm.Subscribe
                selector={(state) => [state.canSubmit]}
                children={([canSubmit]) => (
                  <button type="submit" disabled={!canSubmit}>
                    <PlusCircleIcon
                      className={clsx(
                        'flex h-7 w-7 cursor-pointer justify-end text-right hover:text-green-600',
                        addRecipientError
                          ? 'animate-bounce text-red-700'
                          : isValidateRecipientEmailPending
                            ? 'animate-spin'
                            : '',
                      )}
                    />
                  </button>
                )}
              />
              {field.state.meta.errors.length > 0 ? (
                <em role="alert" className="text-red-500">
                  {field.state.meta.errors.join(', ')}
                </em>
              ) : null}
            </div>
          </div>
        )}
      />
      <newSeshAddRecipientForm.Subscribe
        selector={(state) => [state.errorMap]}
        children={([errorMap]) =>
          errorMap.onSubmit ? (
            <div>
              <em>There was an error on the form: {errorMap.onSubmit}</em>
            </div>
          ) : null
        }
      />
    </form>
  );
};
