import { createFileRoute } from '@tanstack/react-router';
import { Group, Stack, Title } from '@mantine/core';
import { CustomButtonLink } from '@app/ui-core/custom';

export const Route = createFileRoute('/(app)/create-portfolio/$portfolioId/preview')({
  component: PortfolioPreview,
});

function PortfolioPreview() {
  const { portfolioId } = Route.useParams();
  //TODO: API call to pull the data required to preview the holding before submit
  return (
    <Stack h="80vh" justify="space-between">
      <Stack>
        <Title order={3}>Portfolio Preview</Title>
      </Stack>
      <Group style={{ alignSelf: 'flex-end' }}>
        <CustomButtonLink
          to="/create-portfolio/$portfolioId/submit"
          params={{ portfolioId }}
          variant="outline"
        >
          Previous
        </CustomButtonLink>
        <CustomButtonLink to="/create-portfolio/$portfolioId/submit" params={{ portfolioId }}>
          Next
        </CustomButtonLink>
      </Group>
    </Stack>
  );
}
