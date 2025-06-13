import { createFileRoute } from '@tanstack/react-router';
import { useIntl } from 'react-intl';
import { Button, Flex, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconBulb, IconChartLine, IconHelp } from '@tabler/icons-react';

import { SearchSortDropdown } from '../../components/dashboard/SearchSortDropdown';
import { StockCard } from '../../components/dashboard/StockCard';
import { ArticleCard } from '../../components/dashboard/ArticleCard';
import portfolioData from './../../mocks/portfolio-data.json';
import researchData from './../../mocks/research-data.json';

export const Route = createFileRoute('/(app)/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const { formatMessage } = useIntl();

  return (
    <Flex
      gap="md"
      align="flex-start"
      style={{
        backgroundImage: 'url(/background-pattern.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Stack w="75%">
        <Group justify="space-between" align="center">
          <Text fw={400} size="xl">
            {formatMessage({ id: 'MY_PORTFOLIOS', defaultMessage: 'My Portfolios' })}
          </Text>
          <SearchSortDropdown
            defaultValue="Recent"
            onChange={(value) => {
              console.log('Selected value:', value);
            }}
          />
        </Group>

        <SimpleGrid cols={4} spacing="md">
          <StockCard name="add" />
          {portfolioData.portfolios.map((item) => (
            <StockCard key={item._id} {...item} />
          ))}
        </SimpleGrid>
      </Stack>

      <Stack w="25%">
        <Group gap="xs" wrap="nowrap">
          <Button size="sm" fullWidth leftSection={<IconBulb size={16} />}>
            {formatMessage({ id: 'IDEA_GENERATION' })}
          </Button>
          <Button size="sm" variant="outline" fullWidth leftSection={<IconChartLine size={16} />}>
            {formatMessage({ id: 'STOCK_PROFILE' })}
          </Button>
        </Group>

        <Stack bg="gray.0" p="md">
          <Group align="center" gap="sm">
            <Text fw={500}>{formatMessage({ id: 'STYLE_RESEARCH' })}</Text>
            <IconHelp size={16} />
          </Group>
          <Stack gap="sm">
            {researchData.map((item) => (
              <ArticleCard key={item._id} {...item} showLinks />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
}
