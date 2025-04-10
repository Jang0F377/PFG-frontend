import Button from '@common/components/Button';
import { urls } from '@common/utils/http/routeUrls';
import { useForm } from '@tanstack/react-form';

export interface SignUpFormOptions {
  email: string;
  password: string;
  confirmPassword: string;
  favoriteGames?: string[];
}

interface SignUpFormProps {
  handleSubmit: (input: SignUpFormOptions) => void;
}

const SignUpForm = ({ handleSubmit }: SignUpFormProps) => {
  const registrationForm = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      favoriteGames: [],
    },
    onSubmit: ({ value }) => {
      handleSubmit(value);
    },
    validators: {
      onSubmit: ({ value }) => {
        if (value.password !== value.confirmPassword) {
          return {
            fields: {
              confirmPassword: 'Passwords must match',
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
          registrationForm.handleSubmit();
        }}
      >
        <registrationForm.Field
          name="email"
          validators={{
            onSubmit: ({ value }) => (!value ? 'Email is required' : null),
          }}
          children={(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id={field.name}
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
        <registrationForm.Field
          name="password"
          validators={{
            onSubmit: ({ value }) => (!value ? 'Password is required' : null),
          }}
          children={(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  autoComplete="current-password"
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
        <registrationForm.Field
          name="confirmPassword"
          validators={{
            onSubmit: ({ value }) =>
              !value ? 'Confirm Password is required' : null,
          }}
          children={(field) => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  autoComplete="current-password"
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
        <registrationForm.Subscribe
          selector={(state) => [state.errorMap]}
          children={([errorMap]) =>
            errorMap.onSubmit ? (
              <div>
                <em>There was an error on the form: {errorMap.onSubmit}</em>
              </div>
            ) : null
          }
        />
        <registrationForm.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="mt-3">
              {isSubmitting ? '...' : 'Submit'}
            </Button>
          )}
        />
      </form>
      <p className="mt-5 text-center text-sm text-gray-700">
        Already a member?{' '}
        <a
          href={urls.LOGIN.route}
          className="text-neon-blue-600 hover:text-neon-blue-500 leading-6 font-semibold"
        >
          Login Here
        </a>
      </p>
    </>
  );
};

export default SignUpForm;
