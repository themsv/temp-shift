import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { Grid, Paper, Stack, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export const Route = createFileRoute('/(app)/analyze/$portfolioId/idea-generation/regimes')({
  component: EconomicRegimes,
});

function EconomicRegimes() {
  const { portfolioId } = Route.useParams();
  return (
    <Grid gutter="xl" py="sm">
      <Grid.Col span={3}>
        <Stack>
          <TextInput rightSection={<IconSearch size={16} />} size="xs" />
          <Paper withBorder bg={'gray.1'} p="md" radius="md">
            <Text size="small" c="grey">
              Regime Charts
            </Text>
            <Stack gap="0" bg="white">
              <Link
                to="/analyze/$portfolioId/idea-generation/regimes/leading-indicator"
                params={{ portfolioId }}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '8px',
                  fontSize: '12px',
                  borderBottom: '1px solid lightgray',
                }}
                activeProps={{ style: { backgroundColor: 'var(--mantine-color-gray-3)' } }}
              >
                OECD Leading Indicator & Economic Regimes
              </Link>
              <Link
                to="/analyze/$portfolioId/idea-generation/regimes/economic-surprise"
                params={{ portfolioId }}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '8px',
                  fontSize: '12px',
                  borderBottom: '1px solid lightgray',
                }}
                activeProps={{ style: { backgroundColor: 'var(--mantine-color-gray-3)' } }}
              >
                Economic Surprise
              </Link>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '8px',
                  fontSize: '12px',
                  borderBottom: '1px solid lightgray',
                }}
                activeProps={{ style: { backgroundColor: 'var(--mantine-color-gray-3)' } }}
                disabled
              >
                Inflation Rate & Its regimes
              </Link>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '8px',
                  fontSize: '12px',
                  borderBottom: '1px solid lightgray',
                }}
                activeProps={{ style: { backgroundColor: 'var(--mantine-color-gray-3)' } }}
                disabled
              >
                10-Year TIPS/US Breakeven Inflation
              </Link>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '8px',
                  fontSize: '12px',
                  borderBottom: '1px solid lightgray',
                }}
                activeProps={{
                  style: { backgroundColor: 'var(--mantine-color-gray-3)', fontSize: '12px' },
                }}
                disabled
              >
                10-Year Yield and its regimes
              </Link>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '8px',
                  fontSize: '12px',
                  borderBottom: '1px solid lightgray',
                }}
                activeProps={{ style: { backgroundColor: 'var(--mantine-color-gray-3)' } }}
                disabled
              >
                Yield Curve (10-2Yr) & its regimes
              </Link>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: '8px',
                  fontSize: '12px',
                  borderBottom: '1px solid lightgray',
                }}
                activeProps={{ style: { backgroundColor: 'var(--mantine-color-gray-3)' } }}
                disabled
              >
                Volatility Index (VIX) & its regimes
              </Link>
            </Stack>
          </Paper>
        </Stack>
      </Grid.Col>
      <Grid.Col span={9} h="100%">
        <Outlet />
      </Grid.Col>
    </Grid>
  );
}
