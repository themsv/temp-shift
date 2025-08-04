import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Group, ScrollArea, Stack, Tabs, Text } from '@mantine/core';
import { IconChartBar, IconLayoutBoard } from '@tabler/icons-react';

import { ArticleCard } from '@app/components/dashboard/ArticleCard';
import ContributorsTable from '@app/components/ContributorsTable/ContributorsTable';
import { ContributorsControls } from '@app/components/ContributorsTable/ContributorsControls';
import { BubbleChart, HeatmapChart, SkyLine } from '@app/components/charts/SkyLine';
import insights from '../../../mocks/insights.json';

const tabs = [
  { label: 'Style Flavours', value: 'flavours' },
  { label: 'Factors', value: 'factors' },
  { label: 'Industrial Groups', value: 'groups' },
  { label: 'Macro Betas', value: 'macros' },
];

export const Route = createFileRoute('/(app)/analyze/$portfolioId')({
  component: PortfolioDetails,
});

function PortfolioDetails() {
  //TODO: prefetch or API call to get portfolio passing portfolioId

  const [checked, setChecked] = useState(true);
  const [showBubble] = useState(false);

  return (
    <Group gap="0" h="calc(100vh - 48px - 32px)">
      <Stack w="calc(100% - 340px - 20px)" h="100%">
        <Tabs defaultValue="groups">
          <Tabs.List>
            {tabs.map((t) => (
              <Tabs.Tab value={t.value} key={t.value}>
                {t.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {tabs.map((t) => (
            // NOTE: The hardcoded height is a ugly workaround for now which needs to be calculated
            // dynamically from 100vh - headerHeight - elementsHeight etc  -Saivenkat
            <Tabs.Panel value={t.value} key={t.value} p="md" component={ScrollArea} h="76vh">
              <Tabs variant="pills" defaultValue="bar-chart">
                <Tabs.List>
                  <Tabs.Tab value="bar-chart">
                    <IconChartBar size={24} />
                  </Tabs.Tab>
                  <Tabs.Tab value="heatmap">
                    <IconLayoutBoard size={24} />
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="bar-chart">
                  {showBubble ? <BubbleChart /> : <SkyLine />}
                  <ContributorsControls checked={checked} setChecked={setChecked} />
                  <ContributorsTable />
                </Tabs.Panel>

                <Tabs.Panel value="heatmap">
                  <HeatmapChart />
                  <ContributorsControls checked={checked} setChecked={setChecked} />
                  <ContributorsTable />
                </Tabs.Panel>
              </Tabs>
            </Tabs.Panel>
          ))}
        </Tabs>
      </Stack>
      <Stack w={340} p="0" gap="xs" h="100%">
        <Stack bg="gray.0" p="md">
          <Text fw={500}>Insights</Text>
          <ScrollArea h="74vh" offsetScrollbars type="hover">
            <Stack gap="sm">
              {insights.map((item) => (
                <ArticleCard key={item.id} {...item} />
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
      </Stack>
    </Group>
  );
}
