import { createFileRoute } from '@tanstack/react-router';
import { Card, Center, Divider, Grid, Select, Stack, Text, Title } from '@mantine/core';
import { useIntl } from 'react-intl';

import settingsConfig from '../../mocks/settings.json';

export const Route = createFileRoute('/(app)/settings')({
  component: Settings,
});

function Settings() {
  const { formatMessage } = useIntl();
  return (
    <Stack>
      <Title order={3}>{formatMessage({ id: 'SETTINGS_PAGE_TITLE' })}</Title>
      <Center>
        <Stack w="70vw" component={Card}>
          <Grid>
            <Grid.Col span={10}>{formatMessage({ id: 'SETTINGS_COUNTRY_REGION' })}</Grid.Col>

            <Grid.Col span={2}>
              <Select value={settingsConfig.country.value} data={settingsConfig.country.options} />
            </Grid.Col>

            <Grid.Col span={12} my="sm">
              <Divider />
            </Grid.Col>
            <Grid.Col span={12}>
              <Text fw={600}>{formatMessage({ id: 'SETTINGS_HEADER_DATE_TIME' })}</Text>
            </Grid.Col>

            <Grid.Col span={10}>{formatMessage({ id: 'SETTINGS_DATE_SHORT' })}</Grid.Col>

            <Grid.Col span={2}>
              <Select
                value={settingsConfig.dateTime.shortDate.value}
                data={settingsConfig.dateTime.shortDate.options}
              />
            </Grid.Col>

            <Grid.Col span={10}>{formatMessage({ id: 'SETTINGS_DATE_LONG' })}</Grid.Col>

            <Grid.Col span={2}>
              <Select
                value={settingsConfig.dateTime.longDate.value}
                data={settingsConfig.dateTime.longDate.options}
              />
            </Grid.Col>

            <Grid.Col span={10}>{formatMessage({ id: 'SETTINGS_TIME_CLOCK' })}</Grid.Col>

            <Grid.Col span={2}>
              <Select
                value={settingsConfig.dateTime.clockFormat.value}
                data={settingsConfig.dateTime.clockFormat.options}
              />
            </Grid.Col>

            <Grid.Col span={10}>{formatMessage({ id: 'SETTINGS_TIME_SHORT' })}</Grid.Col>

            <Grid.Col span={2}>
              <Select
                value={settingsConfig.dateTime.shortTime.value}
                data={settingsConfig.dateTime.shortTime.options}
              />
            </Grid.Col>

            <Grid.Col span={10}>{formatMessage({ id: 'SETTINGS_TIME_LONG' })}</Grid.Col>

            <Grid.Col span={2}>
              <Select
                value={settingsConfig.dateTime.longTime.value}
                data={settingsConfig.dateTime.longTime.options}
              />
            </Grid.Col>
            <Grid.Col span={12} my="sm">
              <Divider />
            </Grid.Col>
            <Grid.Col span={12}>
              <Text fw={600}>{formatMessage({ id: 'SETTINGS_HEADER_ALIGNMENT' })}</Text>
            </Grid.Col>

            <Grid.Col span={10}>{formatMessage({ id: 'SETTINGS_ALIGNMENT_NUMERIC' })}</Grid.Col>

            <Grid.Col span={2}>
              <Select
                value={settingsConfig.alignment.numeric.value}
                data={settingsConfig.alignment.numeric.options}
              />
            </Grid.Col>

            <Grid.Col span={10}>{formatMessage({ id: 'SETTINGS_ALIGNMENT_TEXT' })}</Grid.Col>

            <Grid.Col span={2}>
              <Select
                value={settingsConfig.alignment.text.value}
                data={settingsConfig.alignment.text.options}
              />
            </Grid.Col>

            <Grid.Col span={12} my="sm">
              <Divider />
            </Grid.Col>

            <Grid.Col span={10}>{formatMessage({ id: 'SETTINGS_DEFAULT_CCY' })}</Grid.Col>

            <Grid.Col span={2}>
              <Select
                value={settingsConfig.defaultCurrency.value}
                data={settingsConfig.defaultCurrency.options}
              />
            </Grid.Col>
            <Grid.Col span={12} my="sm">
              <Divider />
            </Grid.Col>

            <Grid.Col span={10}>{formatMessage({ id: 'SETTINGS_DEFAULT_UNIV' })}</Grid.Col>

            <Grid.Col span={2}>
              <Select
                value={settingsConfig.defaultUniverse.value}
                data={settingsConfig.defaultUniverse.options}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Divider />
            </Grid.Col>
          </Grid>
        </Stack>
      </Center>
    </Stack>
  );
}
