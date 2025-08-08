import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Divider, Grid, Group, Select, Text, Title } from '@mantine/core';
import { useIntl } from 'react-intl';
import { IdeaGenAndStockProfile } from '@app/components/IdeaGenAndStockProfile';

export const Route = createFileRoute('/(app)/analyze')({
  component: RouteComponent,
});

function RouteComponent() {
  const { formatMessage } = useIntl();
  return (
    <>
      <Grid gutter="xs" align="center">
        <Grid.Col span={3}>
          <Group>
            <Text size="xs">{formatMessage({ id: 'NAV_ITEM_DASHBOARD' })}</Text>
            {/* TODO: Wire API that gives lite details of portfolios like name, id with debounce search */}
            <Select searchable data={[]} defaultValue="202" style={{ width: '55%' }} />
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group style={{ border: '1px solid lightGrey', padding: '1%', width: '90%' }}>
            <Group>
              <Text size="xs" style={{ lineHeight: 1 }}>
                Total Stocks
              </Text>
              <Title order={6} style={{ lineHeight: 1, fontWeight: 600 }}>
                140
              </Title>
            </Group>

            <Divider orientation="vertical" />

            <Group>
              <Text size="xs" ta="center" style={{ lineHeight: 1 }}>
                Tracking Error
              </Text>
              <Title order={6} style={{ lineHeight: 1, fontWeight: 600 }}>
                0.04%
              </Title>
            </Group>

            <Divider orientation="vertical" />

            <Group>
              <Text size="xs" ta="center" style={{ lineHeight: 1 }}>
                Active Share
              </Text>
              <Title order={6} style={{ lineHeight: 1, fontWeight: 600 }}>
                89%
              </Title>
            </Group>

            <Divider orientation="vertical" />

            <Group>
              <Text size="xs" ta="center" style={{ lineHeight: 1 }}>
                Beta
              </Text>
              <Title order={6} style={{ lineHeight: 1, fontWeight: 600 }}>
                1.33
              </Title>
            </Group>
          </Group>
        </Grid.Col>
        <Grid.Col span={3}>
          {' '}
          <IdeaGenAndStockProfile />
        </Grid.Col>
      </Grid>
      <Outlet />
    </>
  );
}
