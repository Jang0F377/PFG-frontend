import Button from '@common/components/Button';
import { urls } from '@common/utils/http/routeUrls';
import { useForm } from '@tanstack/react-form';

interface LoginFormOptions {
  email: string;
  password: string;
}

interface LoginFormProps {
  handleSubmit: (data: LoginFormOptions) => void;
}

const LoginForm = ({ handleSubmit }: LoginFormProps) => {
  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ value }) => {
      handleSubmit(value);
    },
    validators: {
      onSubmit: ({ value }) => {
        if (!value.email) {
          return {
            fields: {
              email: 'Email is required',
            },
          };
        }
        if (!value.password) {
          return {
            fields: {
              password: 'Password is required',
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
          loginForm.handleSubmit();
        }}
      >
        <loginForm.Field
          name="email"
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
        <loginForm.Field
          name="password"
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
                  autoComplete="current-password"
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
        <loginForm.Subscribe
          selector={(state) => [state.errorMap]}
          children={([errorMap]) =>
            errorMap.onSubmit ? (
              <div>
                <em>There was an error on the form: {errorMap.onSubmit}</em>
              </div>
            ) : null
          }
        />
        <loginForm.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="mt-3">
              {isSubmitting ? '...' : 'Submit'}
            </Button>
          )}
        />
      </form>
      <p className="mt-5 text-center text-sm text-gray-700">
        New to the Sesh scene?{' '}
        <a
          href={urls.REGISTRATION.route}
          className="text-neon-blue-600 hover:text-neon-blue-500 leading-6 font-semibold"
        >
          Create an account
        </a>
      </p>
    </>
  );
};

export default LoginForm;
