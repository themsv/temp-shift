import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/portfolio/create')({
  component: CreatePortfolio,
});

function CreatePortfolio() {
  return <div>Hello "/(app)/portfolio/create"!</div>;
}
