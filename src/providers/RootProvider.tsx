import type { PropsWithChildren } from 'react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { ModuleRegistry } from 'ag-grid-community';

import ApiProvider from './ApiProvider';
import I18nProvider from './I18nProvider';
import ThemeProvider from './StyleProvider';
import { routeTree } from '../routeTree.gen';

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Register all Community and Enterprise features
ModuleRegistry.registerModules([AllEnterpriseModule]);
function RootProvider({ children }: PropsWithChildren) {
  return (
    <I18nProvider>
      <ApiProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          {children}
        </ThemeProvider>
      </ApiProvider>
    </I18nProvider>
  );
}

export default RootProvider;
