import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

type MyRootContext = {
  queryClient: QueryClient;
};
export const Route = createRootRouteWithContext<MyRootContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
