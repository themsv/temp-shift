import type { PropsWithChildren } from 'react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import ApiProvider from './ApiProvider';
import { I18nProvider } from './I18nProvider';
import { routeTree } from '../routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
function RootProvider({ children }: PropsWithChildren) {
  return (
    <I18nProvider>
      <ApiProvider>
        <RouterProvider router={router} />
        {children}
      </ApiProvider>
    </I18nProvider>
  );
}

export default RootProvider;
