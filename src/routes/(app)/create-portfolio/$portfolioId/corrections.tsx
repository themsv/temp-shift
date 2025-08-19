import { createFileRoute } from '@tanstack/react-router';
import { Group, Stack, Tabs } from '@mantine/core';
import { IconCircleCheck, IconCircleMinus } from '@tabler/icons-react';
import { InvalidHoldings, ValidHoldings } from '@app/components/portfolio/HoldingsTable';
import { CustomButtonLink } from '@app/ui-core/custom';

export const Route = createFileRoute('/(app)/create-portfolio/$portfolioId/corrections')({
  component: HoldingCorrections,
});

function HoldingCorrections() {
  const { portfolioId } = Route.useParams();
  return (
    <Stack h="80vh" justify="space-between">
      <Stack>
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
          <Tabs.Panel value="invalid">
            <InvalidHoldings />
          </Tabs.Panel>
          <Tabs.Panel value="valid">
            <ValidHoldings />
          </Tabs.Panel>
        </Tabs>
      </Stack>
      <Group style={{ alignSelf: 'flex-end' }}>
        <CustomButtonLink
          to="/create-portfolio/$portfolioId/submit"
          params={{ portfolioId: portfolioId }}
          variant="outline"
        >
          Previous
        </CustomButtonLink>
        <CustomButtonLink
          to="/create-portfolio/$portfolioId/preview"
          params={{ portfolioId: portfolioId }}
        >
          Next
        </CustomButtonLink>
      </Group>
    </Stack>
  );
}
