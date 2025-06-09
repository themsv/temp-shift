import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(app)/help')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(app)/help"!</div>;
}
