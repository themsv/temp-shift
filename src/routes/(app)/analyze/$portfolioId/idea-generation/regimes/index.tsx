import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/analyze/$portfolioId/idea-generation/regimes/')({
  beforeLoad: ({ params }) =>
    redirect({ to: '/analyze/$portfolioId/idea-generation/regimes/leading-indicator', params }),
});
