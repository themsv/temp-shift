import { Stack, Text, Title } from '@mantine/core';
import { useIntl } from 'react-intl';

function BrandPage() {
  const intl = useIntl();

  return (
    <Stack justify="space-between" p="xl" bg="black">
      <img
        src="/macquarie-logo.svg"
        alt="Macquarie logo"
        style={{ backgroundColor: 'black' }}
        width={240}
      />
      <Stack>
        <Title order={1} c="white">
          {intl.formatMessage({ id: 'PORTFOLIO_INSIGHTS' })}
        </Title>
        <Text c="dimmed">{intl.formatMessage({ id: 'PORTFOLIO_PREFERENCE' })}</Text>
      </Stack>
    </Stack>
  );
}

export default BrandPage;
