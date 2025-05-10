import { PlusCircleIcon } from '@heroicons/react/24/outline';
import {
  useApiValidateRecipientEmail,
  ValidateRecipientEmailResponseData,
} from '@services/users/useApiValidateRecipientEmail';
import { useForm } from '@tanstack/react-form';
import clsx from 'clsx';
import Button from '../Button';
import { useEffect, useState } from 'react';

export interface NewSeshFormOptions {
  gameName: string;
  gameTime: string;
  gameDate: string;
  gameNotes?: string;
}

export interface NewSeshFormProps {
  handleSubmit: () => void;
  handleCancel: () => void;
  defaultValues: NewSeshFormOptions;
  handleAddValidRecipient: (recipientId: string) => void;
  validatedRecipients: string[];
}

export const NewSeshForm = ({
  handleSubmit,
  handleCancel,
  defaultValues,
  handleAddValidRecipient,
  validatedRecipients,
}: NewSeshFormProps) => {
  const {
    mutate: validateRecipientEmail,
    isPending: isValidateRecipientEmailPending,
    isError: isValidateRecipientEmailError,
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
            handleAddValidRecipient(input.recipientEmail);
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
    onSubmit: () => {
      console.log('onSubmit');
      handleSubmit();
    },
    validators: {},
  });

  useEffect(() => {
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
          recipientEmail: '',
        }}
        isValidateRecipientEmailPending={isValidateRecipientEmailPending}
        isValidateRecipientEmailError={isValidateRecipientEmailError}
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
        <newSeshForm.Subscribe
          selector={(state) => [state.canSubmit]}
          children={([canSubmit]) => (
            <Button type="submit" disabled={!canSubmit}>
              Create Sesh
            </Button>
          )}
        />
      </form>
    </>
  );
};

interface NewSeshAddRecipientFormOptions {
  recipientEmail: string;
}

interface NewSeshAddRecipientFormProps {
  defaultValues: NewSeshAddRecipientFormOptions;
  handleSubmit: (input: NewSeshAddRecipientFormOptions) => void;
  isValidateRecipientEmailPending: boolean;
  isValidateRecipientEmailError: boolean;
  isValidateRecipientEmailSuccess: boolean;
  addRecipientError: boolean;
  validatedRecipients: string[];
}

const NewSeshAddRecipientForm = ({
  defaultValues,
  handleSubmit,
  isValidateRecipientEmailPending,
  isValidateRecipientEmailError,
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
    <>
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
                          isValidateRecipientEmailError || addRecipientError
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
    </>
  );
};
