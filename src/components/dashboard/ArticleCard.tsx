import { Card, Text, Anchor, Group, Stack } from '@mantine/core';
import { useIntl } from 'react-intl';

interface ArticleCardProps {
  title: string;
  description: string;
  showLinks?: boolean;
}

export const ArticleCard = ({ title, description, showLinks = false }: ArticleCardProps) => {
  const { formatMessage } = useIntl();

  return (
    <Card withBorder p="sm" shadow="sm" component={Stack} gap="sm">
      <Text fw={500} size="sm">
        {title}
      </Text>
      <Text size="xs">{description}</Text>

      {showLinks && (
        <Group gap={12} wrap="wrap">
          <Anchor href="#" size="xs" c="#007859" underline="always" fw={400}>
            {formatMessage({ id: 'READ_MORE' })}
          </Anchor>

          <Anchor href="#" size="xs" c="#007859" underline="always" fw={400}>
            {formatMessage({ id: 'DOWNLOAD' })}
          </Anchor>
        </Group>
      )}
    </Card>
  );
};
