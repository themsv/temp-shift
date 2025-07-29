import { createFileRoute } from '@tanstack/react-router';
import { Group, Stack, Tabs, TextInput } from '@mantine/core';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import { CustomButtonLink, CustomHeading } from '@app/ui-core/custom';
import { InvalidHoldings, ValidHoldings } from '@app/components/portfolio/HoldingsTable';

export const Route = createFileRoute(
  '/(app)/create-portfolio/$portfolioId/create-benchmark/corrections',
)({
  component: RouteComponent,
});

const CORRECTION_TABS = [
  {
    label: 'Errors',
    value: 'invalid',
    icon: <IconCircleX color="red" />,
  },
  {
    label: 'Mapped',
    value: 'valid',
    icon: <IconCircleCheck color="green" />,
  },
];
function RouteComponent() {
  const { portfolioId } = Route.useParams();

  return (
    <Stack h="80vh" justify="space-between">
      <Stack>
        <CustomHeading title="Create Custom Benchmark" description="Set up a Custom Benchmark" />
        <TextInput label="Benchmark Name" />
        <Tabs defaultValue="invalid">
          <Tabs.List>
            {CORRECTION_TABS.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value} leftSection={tab.icon}>
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Panel value="invalid" w="100%">
            <InvalidHoldings />
          </Tabs.Panel>
          <Tabs.Panel value="valid" w="100%">
            <ValidHoldings />
          </Tabs.Panel>
        </Tabs>
      </Stack>
      <Group style={{ alignSelf: 'flex-end' }}>
        <CustomButtonLink
          to="/create-portfolio/$portfolioId/create-benchmark/metadata"
          params={{ portfolioId }}
          variant="outline"
        >
          Previous
        </CustomButtonLink>
        <CustomButtonLink
          to="/create-portfolio/$portfolioId/create-benchmark/preview"
          params={{ portfolioId }}
        >
          Next
        </CustomButtonLink>
      </Group>
    </Stack>
  );
}
