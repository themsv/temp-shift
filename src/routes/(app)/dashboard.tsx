import { createFileRoute } from '@tanstack/react-router';
import { useIntl } from 'react-intl';
import { Box, Button, Flex, Group, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconBulb, IconChartLine } from '@tabler/icons-react';

import { SearchSortDropdown } from '../../components/dashboard/SearchSortDropdown';
import { StockCard } from '../../components/dashboard/StockCard';
import { ResearchCard } from '../../components/dashboard/ResearchCard';
import portfolioData from './../../mocks/portfolio-data.json';
import researchData from './../../mocks/research-data.json';

export const Route = createFileRoute('/(app)/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const { formatMessage } = useIntl();

  return (
    <Flex gap="md" align="flex-start">
      <Box w="75%">
        <Flex justify="space-between" align="center" mb="md">
          <Text fw={400} size="xl">
            {formatMessage({ id: 'MY_PORTFOLIOS', defaultMessage: 'My Portfolios' })}
          </Text>
          <SearchSortDropdown
            defaultValue="Recent"
            onChange={(value) => {
              console.log('Selected value:', value);
            }}
          />
        </Flex>

        <SimpleGrid cols={4} spacing="md">
          <StockCard name="add" />
          {portfolioData.portfolios.map((item) => (
            <StockCard key={item._id} {...item} />
          ))}
        </SimpleGrid>
      </Box>

      <Box w="25%">
        <Group gap="xs" wrap="nowrap" mb="sm">
          <Button size="sm" color="#2D8CF0" fullWidth leftSection={<IconBulb size={16} />}>
            {formatMessage({ id: 'IDEA_GENERATION' })}
          </Button>
          <Button size="sm" variant="default" fullWidth leftSection={<IconChartLine size={16} />}>
            {formatMessage({ id: 'STOCK_PROFILE' })}
          </Button>
        </Group>

        <Paper bg="gray.0" radius="md" p="sm">
          <Text fw={500} mb="sm">
            {formatMessage({ id: 'STYLE_RESEARCH' })}
          </Text>
          <Stack gap="sm">
            {researchData.map((item) => (
              <ResearchCard key={item._id} {...item} />
            ))}
          </Stack>
        </Paper>
      </Box>
    </Flex>
  );
}
