import Button from '@common/components/Button';
import { useForm } from '@tanstack/react-form';

export interface AccountFormOptions {
  email?: string;
  username?: string;
  favoriteGames?: string[];
}

interface AccountFormProps {
  handleSubmit: (input: AccountFormOptions) => void;
  handleCancel: () => void;
  defaultValues: AccountFormOptions;
}

const AccountForm = ({
  handleSubmit,
  handleCancel,
  defaultValues,
}: AccountFormProps) => {
  const accountForm = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      handleSubmit(value);
    },
    validators: {},
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          accountForm.handleSubmit();
        }}
      >
        <accountForm.Field
          name="email"
          children={(field) => (
            <div className="max-w-xl">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id={field.name}
                  type="email"
                  placeholder={defaultValues.email}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
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
        <accountForm.Field
          name="username"
          children={(field) => (
            <div className="max-w-xl">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id={field.name}
                  type="text"
                  placeholder={defaultValues.username}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
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
        <accountForm.Field name="favoriteGames" mode="array">
          {(field) => {
            return (
              <div className="max-w-xl">
                {field.state.value?.map((_, i) => {
                  return (
                    <accountForm.Field key={i} name={`favoriteGames[${i}]`}>
                      {(subField) => {
                        return (
                          <div className="max-w-xl">
                            <label
                              htmlFor={subField.name}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Favorite Game {i + 1}
                            </label>
                            <div className="mt-1">
                              <input
                                id={subField.name}
                                type="text"
                                placeholder={defaultValues.favoriteGames?.[i]}
                                name={subField.name}
                                value={subField.state.value}
                                onChange={(e) => {
                                  subField.handleChange(e.target.value);
                                }}
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        );
                      }}
                    </accountForm.Field>
                  );
                })}
              </div>
            );
          }}
        </accountForm.Field>
        <div className="flex max-w-xl flex-row justify-between">
          <accountForm.Subscribe
            selector={(state) => state.isSubmitting}
            children={(isSubmitting) => (
              <Button
                onClick={handleCancel}
                disabled={isSubmitting}
                className="mt-3"
              >
                {isSubmitting ? '...' : 'Cancel'}
              </Button>
            )}
          />
          <accountForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit} className="mt-3">
                {isSubmitting ? '...' : 'Submit'}
              </Button>
            )}
          />
        </div>
      </form>
    </>
  );
};

export default AccountForm;
