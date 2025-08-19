import { createFileRoute } from '@tanstack/react-router';
import { Group, Stack, Tabs, TextInput } from '@mantine/core';
import { IconCircleCheck, IconCircleMinus } from '@tabler/icons-react';
import { CustomButtonLink, CustomHeading } from '@app/ui-core/custom';
import { InvalidHoldings, ValidHoldings } from '@app/components/portfolio/HoldingsTable';

export const Route = createFileRoute(
  '/(app)/create-portfolio/$portfolioId/create-benchmark/corrections',
)({
  component: Corrections,
});

function Corrections() {
  const { portfolioId } = Route.useParams();

  return (
    <Stack h="80vh" justify="space-between">
      <Stack>
        <CustomHeading title="Create Custom Benchmark" description="Set up a Custom Benchmark" />
        <TextInput label="Benchmark Name" value="ASX 300" />
        <Tabs defaultValue="invalid">
          <Tabs.List>
            <Tabs.Tab
              value="invalid"
              leftSection={<IconCircleMinus color="var(--mantine-color-red-9)" />}
              color="var(--mantine-color-red-9)"
            >
              Errors
            </Tabs.Tab>
            <Tabs.Tab
              value="valid"
              color="var(--mantine-color-green-9)"
              leftSection={<IconCircleCheck color="var(--mantine-color-green-9)" />}
            >
              Mapped
            </Tabs.Tab>
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
