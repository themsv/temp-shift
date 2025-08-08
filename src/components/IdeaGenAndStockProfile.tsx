import { useIntl } from 'react-intl';
import { Group, Text } from '@mantine/core';
import { CustomButtonLink } from '@app/ui-core/custom';
import { IconBulb, IconQueryStats } from '@app/ui-core/icons';

export function IdeaGenAndStockProfile() {
  const { formatMessage } = useIntl();
  return (
    <Group gap="xs">
      <CustomButtonLink to="/analyze/idea-generation" leftSection={<IconBulb size="18" />}>
        {formatMessage({ id: 'IDEA_GENERATION' })}
      </CustomButtonLink>
      <CustomButtonLink
        to="/analyze/stock-profile"
        variant="outline"
        leftSection={<IconQueryStats size="18" color="var(--mantine-color-skyblue-5)" />}
      >
        <Text size="xs">{formatMessage({ id: 'STOCK_PROFILE' })} </Text>
      </CustomButtonLink>
    </Group>
  );
}
