import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { LogInMutation } from '@/api/auth/mutations';

const LoginForm = () => {
  const router = useRouter();
  const loginMutation = LogInMutation();

  useEffect(() => {
    if (loginMutation.isSuccess) {
      router.push('/dashboard');
    }
  }, [loginMutation]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mt-12 text-xl font-bold leading-tight md:text-2xl">
        Log in to your account
      </h1>
      <form className="mx-10 mt-6 w-2/3" onSubmit={loginMutation.mutate}>
        <div>
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Enter Email Address"
            className="mt-2 w-full rounded-lg border bg-gray-200 px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none"
            autoFocus
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="mt-2 w-full rounded-lg border bg-gray-200 px-4 py-3 focus:border-blue-500
      focus:bg-white focus:outline-none"
            required
          />
        </div>

        {loginMutation.error && (
          <div className="my-4 flex gap-2 rounded-md bg-red-100 p-4">
            <div className="flex space-y-1 text-sm">
              <h6 className="font-medium text-red-600">
                {loginMutation?.error?.response?.data?.title}:
                <span className="font-light  text-red-600">
                  {loginMutation?.error?.response?.data?.detail}
                </span>
              </h6>
            </div>
          </div>
        )}

        <div className="mt-2 text-right">
          <a
            href="#"
            className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
          >
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="mt-6 block w-full rounded-lg bg-indigo-500 px-4 py-3 font-semibold
    text-white hover:bg-indigo-400 focus:bg-indigo-400"
        >
          Log In
        </button>
      </form>

      <div className="w-2/3">
        <hr className="my-6 w-full border-gray-300" />

        <button
          type="button"
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
        >
          <div className="flex items-center justify-center">
            <span className="ml-4">Log in with Google</span>
          </div>
        </button>
      </div>
      <div className="flex w-2/3 flex-col items-center justify-center">
        <p className="mt-8">
          Need an account?{' '}
          <a
            href="#"
            className="font-semibold text-blue-500 hover:text-blue-700"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
