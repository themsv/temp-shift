import { createFileRoute } from '@tanstack/react-router';
import { Group, Stack, Text, TextInput } from '@mantine/core';
import { CustomButtonLink, CustomHeading } from '@app/ui-core/custom';

export const Route = createFileRoute(
  '/(app)/create-portfolio/$portfolioId/create-benchmark/preview',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { portfolioId } = Route.useParams();

  return (
    <Stack h="80vh" justify="space-between">
      <Stack>
        <CustomHeading title="Create Custom Benchmark" description="Set up a Custom Benchmark" />
        <TextInput label="Benchmark Name" />
        <Text>Portfolio Preview</Text>
      </Stack>
      <Group style={{ alignSelf: 'flex-end' }}>
        <CustomButtonLink
          to="/create-portfolio/$portfolioId/create-benchmark/corrections"
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
