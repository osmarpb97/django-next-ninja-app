import { Suspense } from 'react';

import { useUser } from '@/api/auth/queries';

function Dashboard() {
  const { data } = useUser();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <h1 className="mt-12 text-xl font-bold leading-tight md:text-2xl">
          Hello {data?.email} your last login was {data?.last_login}
        </h1>
      </Suspense>
    </div>
  );
}

Dashboard.auth = true;

export default Dashboard;
