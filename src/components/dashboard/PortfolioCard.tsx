import { useNavigate } from '@tanstack/react-router';
import { Card, Text, Stack } from '@mantine/core';
import { useIntl } from 'react-intl';
import { type PortfolioLite } from '@app/data/types/portfolio';
import { CustomRibbon } from '@app/ui-core/custom';

export const PortfolioCard = ({
  id,
  totalHoldingsCount,
  name,
  description,
  beta,
  trackingError,
  activeShare,
  isMultifund,
}: PortfolioLite) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  return (
    <Card
      component={Stack}
      gap="xs"
      justify="space-between"
      style={{
        // border: '1px solid #F2F2F2',
        boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
      }}
      onClick={() =>
        void navigate({
          to: '/create-portfolio/$portfolioId/submit',
          params: { portfolioId: id.toString() },
        })
      }
    >
      {isMultifund && <CustomRibbon letter="M" />}

      <Text fw={400} size="lg">
        {name}
      </Text>
      <Text size="sm">{description}</Text>
      <Text size="lg" c="blue" fw={600}>
        {formatMessage({ id: 'STOCKS_COUNT' }, { count: totalHoldingsCount })}
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

export const CreatePortfolioCard = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  return (
    <Card
      p="lg"
      bg="#e3f2f9"
      style={{
        border: '1px solid #F2F2F2',
        boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
      }}
      onClick={() => void navigate({ to: '/create-portfolio/metadata' })}
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
};
