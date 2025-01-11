import { UsersWithUse } from './usersWithUse/UsersWithUse';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const UseRectFunc = () => {
  return (
    <ErrorBoundary fallbackRender={({ error }) => <div>Error: {error}</div>}>
      <Suspense fallback={<div>...Loading</div>}>
        <UsersWithUse />
      </Suspense>
    </ErrorBoundary>
  );
};
