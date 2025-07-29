import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  LoadingOverlay,
  ScrollArea,
  Select,
  SimpleGrid,
  Stack,
  Text,
  type SelectProps,
} from '@mantine/core';
import { useIntl } from 'react-intl';
import { IconHelp, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

import { CreatePortfolioCard, PortfolioCard } from '@app/components/dashboard/PortfolioCard';
import { IconBulb, IconQueryStats } from '@app/ui-core/icons';
import { useGetPortfolios } from '@app/data/api';
import { ArticleCard } from '@app/components/dashboard/ArticleCard';
import researchData from '../../mocks/Research-data.json';

export const Route = createFileRoute('/(app)/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  const { formatMessage } = useIntl();

  return (
    <Flex
      gap="md"
      align="flex-start"
      justify="center"
      style={{
        backgroundImage: 'url(/background-pattern.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Portfolios />
      <Stack maw={360}>
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

        <ResearchItems />
      </Stack>
    </Flex>
  );
}

const OPTIONS = [
  { label: 'Recent', value: 'id,desc' },
  { label: 'A-Z', value: 'name,asc' },
];
function Portfolios() {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [opened, { open }] = useDisclosure(false);
  const [sortBy, setSortBy] = useState('id,desc');
  const [pagination] = useState({ size: 10, page: 0 });
  const { data: portfolios, isPending } = useGetPortfolios({ sort: sortBy, ...pagination });

  if (isPending) return <LoadingOverlay />;

  const renderOption: SelectProps['renderOption'] = ({ option }) => {
    const onClick = () =>
      void navigate({ to: '/analyze/$portfolioId', params: { portfolioId: option.value } });
    return (
      <Text onClick={onClick} size="sm">
        {option.label}
      </Text>
    );
  };
  return (
    <Stack>
      <Group align="center" justify="space-between">
        <Text fw={400} size="xl">
          {formatMessage({ id: 'MY_PORTFOLIOS', defaultMessage: 'My Portfolios' })}
        </Text>
        <Group>
          {opened ? (
            // TODO: Wire API that gives lite details of portfolios like name, id with debounce search
            <Select
              searchable
              data={
                portfolios?.content.map((portfolio) => ({
                  label: portfolio.name,
                  value: portfolio.id.toString(),
                })) ?? []
              }
              rightSection={<IconSearch />}
              renderOption={renderOption}
              placeholder="Search"
              size="xs"
            />
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
      {/* NOTE: The hardcoded height is a ugly workaround for now which needs to be calculated
      dynamically from 100vh - headerHeight - elementsHeight etc  -Saivenkat */}
      <ScrollArea h="82vh" type="never">
        <SimpleGrid cols={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
          <CreatePortfolioCard />
          {portfolios?.content.map((portfolio) => (
            <PortfolioCard key={portfolio.id} {...portfolio} />
          ))}
        </SimpleGrid>
      </ScrollArea>
    </Stack>
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
      {/* NOTE: The hardcoded height is a ugly workaround for now which needs to be calculated 
      dynamically from 100vh - headerHeight - elementsHeight etc  -Saivenkat */}
      <ScrollArea h="74vh" type="never">
        <Stack gap="sm">
          {researchData.map((item) => (
            <ArticleCard key={item._id} {...item} showLinks />
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
