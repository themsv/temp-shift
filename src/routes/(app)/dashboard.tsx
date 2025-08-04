import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  ActionIcon,
  Group,
  ScrollArea,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
  Box,
} from '@mantine/core';
import { useIntl } from 'react-intl';
import { IconHelp, IconSearch } from '@tabler/icons-react';
import { useClickOutside, useDisclosure } from '@mantine/hooks';

import { ArticleCard } from '@app/components/dashboard/ArticleCard';
import { CreatePortfolioCard, PortfolioCard } from '@app/components/dashboard/PortfolioCard';
import { useGetPortfolios } from '@app/data/api';
import { IdeaGenAndStockProfile } from '@app/components/IdeaGenAndStockProfile';
import appLayoutConfig, { innerLayout } from '@app/consts/app-layout';

import researchData from '../../mocks/Research-data.json';

export const Route = createFileRoute('/(app)/dashboard')({
  component: Dashboard,
});

const OPTIONS = [
  { label: 'Recent', value: 'id,desc' },
  { label: 'A-Z', value: 'name,asc' },
];

function Dashboard() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const { spacing } = useMantineTheme();

  const [sortBy, setSortBy] = useState('id,desc');
  const [pagination] = useState({ size: 10, page: 0 });
  const [opened, { open, close }] = useDisclosure(false);
  const { data: portfolios } = useGetPortfolios({ sort: sortBy, ...pagination });
  const searchRef = useClickOutside(() => {
    // Delay closing to allow `onOptionSubmit` to complete
    setTimeout(close, 100);
  });

  return (
    <Group
      gap="0"
      h={`calc(100vh - ${appLayoutConfig.header.height} - ${spacing.md} - ${spacing.md})`}
    >
      <Stack w={`calc(100% - ${innerLayout.buttonSetWidth} - ${spacing.md})`} h="100%">
        <Group align="center" justify="space-between">
          <Text fw={600} size="xl">
            {formatMessage({ id: 'MY_PORTFOLIOS', defaultMessage: 'My Portfolios' })}
          </Text>
          <Group>
            {opened ? (
              // TODO: Wire API that gives lite details of portfolios like name, id with debounce search
              <Box ref={searchRef}>
                <Select
                  searchable
                  onOptionSubmit={(value) => {
                    void navigate({ to: '/analyze/$portfolioId', params: { portfolioId: value } });
                  }}
                  data={
                    portfolios?.content.map((portfolio) => ({
                      label: portfolio.name,
                      value: portfolio.id.toString(),
                    })) ?? []
                  }
                  rightSection={<IconSearch />}
                  placeholder="Search"
                  size="xs"
                />
              </Box>
            ) : (
              <ActionIcon onClick={open} variant="transparent">
                <IconSearch />
              </ActionIcon>
            )}
            <Select
              size="xs"
              data={OPTIONS}
              value={sortBy}
              onChange={(val) => {
                setSortBy(val as string);
              }}
              styles={{ input: { border: 0, width: 16 * 6 } }}
            />
          </Group>
        </Group>

        <ScrollArea h="calc(100% - 36px)">
          <SimpleGrid cols={{ sm: 1, md: 2, lg: 3, xl: 4 }} pb="lg">
            <CreatePortfolioCard />
            {portfolios?.content.map((portfolio) => (
              <PortfolioCard key={portfolio.id} {...portfolio} />
            ))}
          </SimpleGrid>
        </ScrollArea>
      </Stack>
      <Stack w={innerLayout.buttonSetWidth} p="0" gap="xs" h="100%">
        <IdeaGenAndStockProfile />
        <ScrollArea h="calc(100% - 36px)">
          <ResearchItems />
        </ScrollArea>
      </Stack>
    </Group>
  );
}

function ResearchItems() {
  const { formatMessage } = useIntl();
  return (
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
  );
}
