import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/analyze/idea-generation')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(app)/analyze/idea-generation"!</div>;
}
