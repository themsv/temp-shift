import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/portfolio/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(app)/portfolio/create"!</div>;
}
