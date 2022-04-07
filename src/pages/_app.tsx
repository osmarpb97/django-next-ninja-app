import { useEffect } from 'react';

import { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useSession } from '@/api/auth/queries';

import '../styles/global.css';

type AppProps = {
  pageProps: any;
  Component: NextComponentType<NextPageContext, any, {}> & { auth: boolean };
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function Auth({ children }: any) {
  const { data, isLoading, failureCount } = useSession();
  const isLoggedIn = data?.status === '200';
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    // If not authenticated, force log in
    if (!isLoggedIn || failureCount > 0) router.push('/login');
  }, [isLoggedIn, isLoading]);

  if (isLoggedIn) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    {Component.auth ? (
      <Auth>
        <Component {...pageProps} />
      </Auth>
    ) : (
      <Component {...pageProps} />
    )}
  </QueryClientProvider>
);

export default MyApp;
