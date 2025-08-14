import { useIntl } from 'react-intl';
import { Group } from '@mantine/core';
import { CustomButtonLink } from '@app/ui-core/custom';
import { IconBulb, IconQueryStats } from '@app/ui-core/icons';
import { innerLayout } from '@app/consts/app-layout';

export function IdeaGenAndStockProfile() {
  const { formatMessage } = useIntl();
  return (
    <Group gap={0} w={innerLayout.buttonSetWidth} justify="space-between">
      {/* FIXME: Navigation to Idea Gen can happen with/without portfolioId So, fix the Link accordingly */}
      <CustomButtonLink
        to="/analyze/$portfolioId/idea-generation"
        leftSection={<IconBulb size="20" />}
      >
        {formatMessage({ id: 'IDEA_GENERATION' })}
      </CustomButtonLink>
      <CustomButtonLink
        to="/analyze/stock-profile"
        variant="outline"
        leftSection={<IconQueryStats size="20" color="var(--mantine-color-skyblue-5)" />}
      >
        {formatMessage({ id: 'STOCK_PROFILE' })}
      </CustomButtonLink>
    </Group>
  );
}
