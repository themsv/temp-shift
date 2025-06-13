import { Stack, Text, Title } from '@mantine/core';
import { useIntl } from 'react-intl';

function BrandPage() {
  const intl = useIntl();

  return (
    <div
      style={{
        backgroundImage: 'url(/signin-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Stack justify="space-between" p="xl" h="100%">
        <img src="/macquarie-logo.svg" alt="Macquarie logo" width={240} />
        <Stack>
          <Title order={1} c="white">
            {intl.formatMessage({ id: 'PORTFOLIO_INSIGHTS' })}
          </Title>
          <Text c="dimmed">{intl.formatMessage({ id: 'PORTFOLIO_PREFERENCE' })}</Text>
        </Stack>
      </Stack>
    </div>
  );
}

export default BrandPage;
