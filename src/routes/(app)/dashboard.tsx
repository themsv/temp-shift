import { Button, Flex, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { useIntl } from 'react-intl';
import { IconHelp } from '@tabler/icons-react';

import { SearchSortDropdown } from '../../components/dashboard/SearchSortDropdown';
import { StockCard } from '../../components/dashboard/StockCard';
import { ArticleCard } from '../../components/dashboard/ArticleCard';
import { IconBulb, IconQueryStats } from '../../ui-core';
import researchData from '../../mocks/Research-data.json';
import portfolioData from '../../mocks/portfolio-data.json';

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
      <Stack>
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

        <SimpleGrid cols={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
          <StockCard name="add" />
          {portfolioData.portfolios.map((item) => (
            <StockCard key={item._id} {...item} />
          ))}
        </SimpleGrid>
      </Stack>

      <Stack>
        <Group gap="xs" grow>
          <Button leftSection={<IconBulb size="24" color="white" />} p="0">
            {formatMessage({ id: 'IDEA_GENERATION' })}
          </Button>
          <Button
            variant="outline"
            leftSection={<IconQueryStats size="24" />}
            c="black"
            style={{ borderColor: 'black' }}
            p="0"
          >
            {formatMessage({ id: 'STOCK_PROFILE' })}
          </Button>
        </Group>

        <Stack bg="gray.0" p="md">
          <Group align="center" gap="sm">
            <Text fw={500}>{formatMessage({ id: 'STYLE_RESEARCH' })}</Text>
            <IconHelp size={20} />
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
