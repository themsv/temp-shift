import { createFileRoute } from '@tanstack/react-router';
import { Grid, Select, TextInput, Card, Divider, Stack, Text, Title, Center } from '@mantine/core';
import { useIntl } from 'react-intl';

import referenceData from '../../mocks/reference-data.json';

export const Route = createFileRoute('/(app)/reference-data')({
  component: RouteComponent,
});

function RouteComponent() {
  const intl = useIntl();

  const renderRow = (label: string, value: string) => (
    <Grid>
      <Grid.Col span={10}>
        <Text size="sm">{label}</Text>
      </Grid.Col>
      <Grid.Col span={2}>
        <TextInput value={value} readOnly />
      </Grid.Col>
    </Grid>
  );

  return (
    <Stack>
      <Title order={3}>{intl.formatMessage({ id: 'TITLE' })}</Title>
      <Center>
        <Stack w="70vw" component={Card}>
          <Text fw={600}>{intl.formatMessage({ id: 'MODEL_TITLE' })}</Text>

          <Grid>
            <Grid.Col span={10}>
              <Text size="sm">{intl.formatMessage({ id: 'BASE_LABEL' })}</Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Select data={referenceData.baseUniverses} value="S&P/ASX 300" readOnly />
            </Grid.Col>
          </Grid>
          {renderRow(intl.formatMessage({ id: 'LATEST_LABEL' }), referenceData.latestAvailableDate)}
          {renderRow(intl.formatMessage({ id: 'STOCK_LABEL' }), referenceData.stockCount)}
          {renderRow(intl.formatMessage({ id: 'CURRENCY_LABEL' }), referenceData.currency)}

          <Divider my="sm" />
          <Text fw={600}>{intl.formatMessage({ id: 'REGIME_TITLE' })}</Text>

          {renderRow(intl.formatMessage({ id: 'START_LABEL' }), referenceData.startOfHistory)}
          {renderRow(intl.formatMessage({ id: 'HISTORY_LABEL' }), referenceData.historyUpdatedTo)}
          {renderRow(
            intl.formatMessage({ id: 'HISTORY_MONTH_LABEL' }),
            referenceData.historyMonths,
          )}
          <Divider my="sm" />
        </Stack>
      </Center>
    </Stack>
  );
}
