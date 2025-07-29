import { Box, Center, Text } from '@mantine/core';

/**
 * Props for the CustomRibbon component.
 * @property letter - The letter to display inside the ribbon.
 */
type CustomRibbonProps = {
  letter: string;
};

/**
 * CustomRibbon displays a decorative ribbon with a single letter.
 * This is always absolute to the parent to be kept in mind
 *
 * @param {CustomRibbonProps} props - The props for the CustomRibbon component.
 * @returns {JSX.Element} The rendered ribbon component.
 *
 * @example
 * <CustomRibbon letter="A" />
 */
export function CustomRibbon({ letter }: CustomRibbonProps) {
  return (
    <Box
      w={24}
      h={30}
      pos="absolute"
      top={0}
      right={0}
      bg="blue"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)',
      }}
    >
      <Center>
        <Text c="white">{letter}</Text>
      </Center>
    </Box>
  );
}
