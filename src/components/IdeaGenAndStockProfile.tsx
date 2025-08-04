import { useIntl } from 'react-intl';
import { Group } from '@mantine/core';
import { CustomButtonLink } from '@app/ui-core/custom';
import { IconBulb, IconQueryStats } from '@app/ui-core/icons';

export function IdeaGenAndStockProfile() {
  const { formatMessage } = useIntl();
  return (
    <Group gap="xs" justify="space-between">
      <CustomButtonLink to="/analyze/idea-generation" leftSection={<IconBulb size="24" />}>
        {formatMessage({ id: 'IDEA_GENERATION' })}
      </CustomButtonLink>
      <CustomButtonLink
        to="/analyze/stock-profile"
        variant="outline"
        leftSection={<IconQueryStats size="24" color="var(--mantine-color-skyblue-5)" />}
      >
        {formatMessage({ id: 'STOCK_PROFILE' })}
      </CustomButtonLink>
    </Group>
  );
}
