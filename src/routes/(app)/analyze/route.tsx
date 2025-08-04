import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Divider, Group, Paper, Select, Stack, Text, Title } from '@mantine/core';
import { useIntl } from 'react-intl';
import { IdeaGenAndStockProfile } from '@app/components/IdeaGenAndStockProfile';

export const Route = createFileRoute('/(app)/analyze')({
  component: RouteComponent,
});

function RouteComponent() {
  const { formatMessage } = useIntl();
  return (
    <>
      <Group gap="0" h={36}>
        <Stack w="calc(100% - 340px - 20px)" h="100%">
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
        </Stack>
        <IdeaGenAndStockProfile />
      </Group>
      <Outlet />
    </>
  );
}
