import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/analyze/$portfolioId/idea-generation/')({
  beforeLoad: ({ params }) =>
    redirect({ to: '/analyze/$portfolioId/idea-generation/top-stocks', params }),
});
