import { createFileRoute, Outlet } from '@tanstack/react-router';
import {
  Divider,
  Group,
  Paper,
  Select,
  Text as MantineText,
  Title as MantineTitle,
  Box,
  useMantineTheme,
  Stack,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { IconCalendarEvent } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { IdeaGenAndStockProfile } from '@app/components/IdeaGenAndStockProfile';
import { innerLayout } from '@app/consts/app-layout';

const Text = MantineText.withProps({
  size: 'sm',
});

const Title = MantineTitle.withProps({ order: 6 });

export const Route = createFileRoute('/(app)/analyze')({
  component: RouteComponent,
});

function RouteComponent() {
  const { spacing, breakpoints } = useMantineTheme();
  const isAboveMd = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  return (
    <Stack w="100%">
      <Group gap={0} h={innerLayout.buttonSetHeight}>
        <Group
          w={`calc(100% - ${innerLayout.buttonSetWidth} - ${spacing.md} )`}
          align="center"
          gap="xs"
        >
          {/* TODO: Wire API that gives lite details of portfolios like name, id with debounce search */}

          <Select
            searchable
            data={[{ value: '202', label: 'Small Cap Growth Fund' }]}
            defaultValue="202"
            styles={{ input: { border: 0 } }}
          />
          <DatePickerInput
            placeholder="dd/mm/yyyy"
            maxDate={dayjs().subtract(1, 'day').format('YYYY-MM-DD')}
            w={110}
            valueFormat="DD/MM/YYYY"
            styles={{
              input: { border: 0 },
              day: {
                color: 'black',
              },
            }}
            rightSection={<IconCalendarEvent size={20} />}
            size="xs"
          />

          {isAboveMd && (
            <Paper withBorder p={6}>
              <Group gap="xs">
                <Group>
                  <Text>Total Stocks</Text>
                  <Title>140</Title>
                </Group>
                <Divider orientation="vertical" />
                <Group>
                  <Text>Tracking Error</Text>
                  <Title>0.04%</Title>
                </Group>
                <Divider orientation="vertical" />
                <Group>
                  <Text>Active Share</Text>
                  <Title>89%</Title>
                </Group>
                <Divider orientation="vertical" />
                <Group>
                  <Text>Beta</Text>
                  <Title>1.33</Title>
                </Group>
              </Group>
            </Paper>
          )}
        </Group>
        <IdeaGenAndStockProfile />
        {/* To sync the layout with Bookmarks */}
        <Box w={spacing.md} />
      </Group>

      <Outlet />
    </Stack>
  );
}
