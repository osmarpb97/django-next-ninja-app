import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useSession } from '@/api/auth/queries';
import LoginForm from '@/components/login/form';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

export default function Login() {
  const router = useRouter();
  const { data, isLoading } = useSession();

  // If authenticated,redirect to home
  useEffect(() => {
    console.log('Checking session');
    const isLoggedIn = data?.status === '200';
    if (isLoading) return;
    if (isLoggedIn) {
      router.push('/dashboard', undefined, {
        shallow: true,
      });
    }
  }, [data, isLoading]);

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <section className="flex h-screen flex-col items-center md:flex-row">
        <div className="hidden h-screen w-full bg-indigo-600 md:w-1/2 lg:block xl:w-1/2">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="flex h-screen w-full flex-col items-center justify-center bg-white px-6 md:mx-auto md:w-1/2 md:max-w-md lg:max-w-full
                    lg:px-16 xl:w-1/3 xl:px-12"
        >
          <LoginForm />
        </div>
      </section>
    </Main>
  );
}
