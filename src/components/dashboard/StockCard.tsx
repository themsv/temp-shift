import { Card, Text, Box, Stack, Flex } from '@mantine/core';
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
  const isAddCard = name === 'add';

  if (isAddCard) {
    return (
      <Card
        withBorder
        p="lg"
        h={240}
        bg="#e3f2f9"
        style={{
          border: '1px solid #F2F2F2',
          boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          h={240}
          style={{ border: '1px dashed #0954a0', borderRadius: 1, cursor: 'pointer' }}
        >
          <Text size="60" fw={700} lh={1} mb={8}>
            +
          </Text>
          <Text size="lg" fw={500}>
            {formatMessage({ id: 'ADD_PORTFOLIO' })}
          </Text>
        </Flex>
      </Card>
    );
  }

  return (
    <Card
      withBorder
      p="md"
      h={240}
      style={{
        border: '1px solid #F2F2F2',
        boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Stack gap={0}>
        <Text fw={400} size="lg">
          {name}
        </Text>
        <Text fw={400} size="sm" mt={2}>
          {description}
        </Text>
        <Text size="lg" c="blue" fw={600} mt="xs" style={{ cursor: 'pointer' }}>
          {formatMessage({ id: 'STOCKS_COUNT' }, { count: stockCount })}
        </Text>
      </Stack>

      <Box bg="#e1faf7" pos="absolute" bottom={0} left={0} right={0} px="sm" py={8} m={1}>
        <Stack gap={4}>
          <Text size="xs">{formatMessage({ id: 'TRACKING_ERROR' }, { value: trackingError })}</Text>
          <Text size="xs">{formatMessage({ id: 'ACTIVE_SHARE' }, { value: activeShare })}</Text>
          <Text size="xs">{formatMessage({ id: 'BETA' }, { value: beta })}</Text>
        </Stack>
      </Box>
    </Card>
  );
};
