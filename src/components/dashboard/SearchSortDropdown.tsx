import { Group, ActionIcon, Select, Box } from '@mantine/core';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';
import option from './../../mocks/portfolio-data.json';

interface SearchSortDropdownProps {
  options?: string[];
  defaultValue?: string;
  onChange?: (value: string | null) => void;
}

export const SearchSortDropdown = ({
  options = option.DEFAULT_OPTIONS,
  defaultValue = option.DEFAULT_OPTIONS[0],
  onChange,
}: SearchSortDropdownProps) => {
  return (
    <Group gap="xs" align="center">
      <ActionIcon variant="subtle" size="sm" color="gray">
        <IconSearch size={16} />
      </ActionIcon>

      <Box w="70px">
        <Select
          data={options}
          defaultValue={defaultValue}
          onChange={onChange}
          size="xs"
          radius="sm"
          rightSection={<IconChevronDown size={14} />}
          rightSectionWidth={24}
          styles={{
            input: {
              paddingRight: 18,
              fontSize: 12,
              paddingLeft: 8,
              border: 'none',
              width: 'auto',
            },
            dropdown: {
              fontSize: 12,
            },
          }}
        />
      </Box>
    </Group>
  );
};
