import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useIntl } from 'react-intl';
import {
  Divider,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { IconChartBar, IconLayoutBoard } from '@tabler/icons-react';

import { ArticleCard } from '@app/components/dashboard/ArticleCard';
import GroupedScatterBarChart from '@app/components/charts/Combination';
import BubbleChart from '@app/components/charts/BubbleCharts';
import ContributorsTable from '@app/components/ContributorsTable/ContributorsTable';
import { IconBulb, IconQueryStats } from '@app/ui-core/icons';
import { ContributorsControls } from '@app/components/ContributorsTable/ContributorsControls';
import HeatMapChart from '@app/components/charts/HeatMapChart';
import { CustomButtonLink } from '@app/ui-core/custom';
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
  const { portfolioId } = Route.useParams();

  //TODO: prefetch or API call to get portfolio passing portfolioId
  const { formatMessage } = useIntl();
  const [checked, setChecked] = useState(true);
  const [showBubble, setShowBubble] = useState(false);

  const handleTooltipClick = () => {
    setShowBubble(true);
    console.log('BUBBLE', portfolioId);
  };

  const handleBackClick = () => {
    setShowBubble(false);
  };

  return (
    <Flex gap="md" align="flex-start">
      <Stack w="100%">
        <Group>
          <Text>{formatMessage({ id: 'NAV_ITEM_DASHBOARD' })}</Text>
          {/* TODO: Wire API that gives lite details of portfolios like name, id with debounce search */}
          <Select searchable data={[]} defaultValue="202" />
          <Paper withBorder p={6}>
            <Group>
              <Group>
                <Text>Total Stocks</Text>
                <Title order={5}>140</Title>
              </Group>
              <Divider orientation="vertical" />
              <Group>
                <Text>Tracking Error</Text>
                <Title order={5}>0.04%</Title>
              </Group>
              <Divider orientation="vertical" />
              <Group>
                <Text>Active Share</Text>
                <Title order={5}>89%</Title>
              </Group>
              <Divider orientation="vertical" />
              <Group>
                <Text>Beta</Text>
                <Title order={5}>1.33</Title>
              </Group>
            </Group>
          </Paper>
        </Group>

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
                  {showBubble ? (
                    <BubbleChart handleBackClick={handleBackClick} />
                  ) : (
                    <GroupedScatterBarChart onTooltipClick={handleTooltipClick} />
                  )}
                  <ContributorsControls checked={checked} setChecked={setChecked} />
                  <ContributorsTable />
                </Tabs.Panel>

                <Tabs.Panel value="heatmap">
                  <HeatMapChart />
                  <ContributorsControls checked={checked} setChecked={setChecked} />
                  <ContributorsTable />
                </Tabs.Panel>
              </Tabs>
            </Tabs.Panel>
          ))}
        </Tabs>
      </Stack>
      <Stack maw={360}>
        <Group gap="xs" grow>
          {/* FIXME: Update the appropriate URLs */}
          <CustomButtonLink
            to="/dashboard"
            leftSection={<IconBulb size="24" color="white" />}
            p="0"
          >
            {formatMessage({ id: 'IDEA_GENERATION' })}
          </CustomButtonLink>
          {/* FIXME: Update the appropriate URLs */}
          <CustomButtonLink
            variant="outline"
            to="/dashboard"
            leftSection={<IconQueryStats size="24" />}
            c="black"
            style={{ borderColor: 'black' }}
          >
            {formatMessage({ id: 'STOCK_PROFILE' })}
          </CustomButtonLink>
        </Group>

        <Stack bg="gray.0" p="md">
          <Text fw={500}>Insights</Text>
          {/* NOTE: The hardcoded height is a ugly workaround for now which needs to be calculated
          dynamically from 100vh - headerHeight - elementsHeight etc  -Saivenkat */}
          <ScrollArea h="74vh" offsetScrollbars type="hover">
            <Stack gap="sm">
              {insights.map((item) => (
                <ArticleCard key={item.id} {...item} />
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
      </Stack>
    </Flex>
  );
}
