import { Card, Text, Stack } from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';
import { useIntl } from 'react-intl';

interface StockCardProps {
  name: string;
  description?: string;
  stockCount?: string;
  trackingError?: string;
  activeShare?: string;
  beta?: string;
}

export const StockCard = ({
  name,
  description,
  stockCount,
  trackingError,
  activeShare,
  beta,
}: StockCardProps) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const isAddCard = name === 'add';

  if (isAddCard) {
    return (
      <Card
        p="lg"
        bg="#e3f2f9"
        style={{
          border: '1px solid #F2F2F2',
          boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
        }}
      >
        <Stack
          align="center"
          justify="center"
          h="100%"
          style={{ border: '1px dashed #0954a0', borderRadius: 1 }}
        >
          <Text size="60" fw={700} lh={1} mb={8}>
            +
          </Text>
          <Text size="lg" fw={500}>
            {formatMessage({ id: 'ADD_PORTFOLIO' })}
          </Text>
        </Stack>
      </Card>
    );
  }

  return (
    <Card
      component={Stack}
      gap="xs"
      justify="space-between"
      style={{
        border: '1px solid #F2F2F2',
        boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
      }}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => navigate({ to: '/portfolio' })}
    >
      <Text fw={400} size="lg">
        {name}
      </Text>
      <Text size="sm">{description}</Text>
      <Text size="lg" c="blue" fw={600}>
        {formatMessage({ id: 'STOCKS_COUNT' }, { count: stockCount })}
      </Text>

      <Card.Section bg="#e1faf7">
        <Stack p="md" gap="xs">
          <Text size="xs">{formatMessage({ id: 'TRACKING_ERROR' }, { value: trackingError })}</Text>
          <Text size="xs">{formatMessage({ id: 'ACTIVE_SHARE' }, { value: activeShare })}</Text>
          <Text size="xs">{formatMessage({ id: 'BETA' }, { value: beta })}</Text>
        </Stack>
      </Card.Section>
    </Card>
  );
};
