import { Divider, Group, Stack, Text, useMantineTheme } from '@mantine/core';

/**
 * Props for the CustomHeading component.
 * @property title - The main heading text.
 * @property description - The subheading or description text.
 */
type CustomHeadingProps = { title: string; description: string };

/**
 * CustomHeading displays a heading with a title and description, separated by a vertical divider.
 *
 * @param {CustomHeadingProps} props - The props for the CustomHeading component.
 * @returns {JSX.Element} The rendered heading component.
 *
 * @example
 * <CustomHeading title="Main Title" description="Subtitle or description" />
 */
export function CustomHeading({ title, description }: CustomHeadingProps) {
  const { primaryColor } = useMantineTheme();
  return (
    <Group>
      <Divider size="lg" orientation="vertical" color={primaryColor} />
      <Stack gap={0}>
        <Text fw={700}>{title}</Text>
        <Text>{description}</Text>
      </Stack>
    </Group>
  );
}
