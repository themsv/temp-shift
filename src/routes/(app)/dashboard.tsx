import { Button, Flex, Group, LoadingOverlay, SimpleGrid, Stack, Text } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { useIntl } from 'react-intl';
import { IconHelp } from '@tabler/icons-react';

import { SearchSortDropdown } from '@app/components/dashboard/SearchSortDropdown';
import { CreatePortfolioCard, PortfolioCard } from '@app/components/dashboard/PortfolioCard';
import { IconBulb, IconQueryStats } from '@app/ui-core/icons';
import researchData from '../../mocks/Research-data.json';
import useGetPortfolios from '@app/data/api/useGetPortfolios';
import { ArticleCard } from '@app/components/dashboard/ArticleCard';

export const Route = createFileRoute('/(app)/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const { formatMessage } = useIntl();
  const { data: portfolios, isPending } = useGetPortfolios();

  if (isPending) return <LoadingOverlay />;

  return (
    <Flex
      gap="md"
      align="flex-start"
      justify="space-around"
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
          <CreatePortfolioCard />
          {portfolios?.map((portfolio) => (
            <PortfolioCard key={portfolio.portfolioId} {...portfolio} />
          ))}
        </SimpleGrid>
      </Stack>

      <Stack maw={420}>
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
