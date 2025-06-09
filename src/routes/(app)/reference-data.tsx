import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/reference-data')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(app)/reference-data"!</div>;
}
