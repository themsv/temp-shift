import { useIntl } from 'react-intl';
import { Group, Text } from '@mantine/core';
import { CustomButtonLink } from '@app/ui-core/custom';
import { IconBulb, IconQueryStats } from '@app/ui-core/icons';

export function IdeaGenAndStockProfile() {
  const { formatMessage } = useIntl();
  return (
    <Group gap="xs" justify="flex-end">
      <CustomButtonLink to="/analyze/idea-generation" leftSection={<IconBulb size="20" />}>
        <Text size="xs"> {formatMessage({ id: 'IDEA_GENERATION' })} </Text>
      </CustomButtonLink>
      <CustomButtonLink
        to="/analyze/stock-profile"
        variant="outline"
        leftSection={<IconQueryStats size="20" color="var(--mantine-color-skyblue-5)" />}
      >
        <Text size="xs">{formatMessage({ id: 'STOCK_PROFILE' })} </Text>
      </CustomButtonLink>
    </Group>
  );
}
