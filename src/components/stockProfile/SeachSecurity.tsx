import { Center, Select, Stack, Text, ActionIcon, Group, Box } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';

interface SelectValue {
  value: string;
  label: string;
}

interface SearchSecurityProps {
  readonly changeFlex: boolean;
  readonly openDetailView: boolean;
  readonly value: SelectValue | null;
  readonly setValue: (v: SelectValue | null) => void;
  readonly setChangeFlex: (b: boolean) => void;
}

export default function SearchSecurity({
  changeFlex,
  openDetailView,
  value,
  setValue,
  setChangeFlex,
}: SearchSecurityProps) {
  let width: string;
  if (changeFlex && !openDetailView) {
    width = '75%';
  } else if (openDetailView) {
    width = '40%';
  } else {
    width = '100%';
  }
  return (
    <Box
      style={{
        width: width,
        transition: 'width 0.3s ease',
        padding: '0.5%',
        border: '1px solid #dcdcdc',
      }}
    >
      <Group justify="space-between">
        <Text fw={500}> Stock Profile </Text>
        <ActionIcon
          onClick={() => {
            window.history.back();
          }}
          aria-label="Go back"
          variant="transparent"
          size="lg"
        >
          <IconX color="black" size={20} />
        </ActionIcon>
      </Group>
      <Center h={500}>
        <Stack align="center" justify="center">
          <Text> Add security for comparison </Text>
          <Select
            searchable
            rightSection={<IconSearch />}
            placeholder="Search"
            clearable
            size="xs"
            style={{
              width: 'clamp(180px, 40vw, 400px)',
            }}
            data={[
              { value: 'IAG AU', label: 'Insurance Australian Group Limited' },
              { value: 'McQ', label: 'Macquarie Investment Bank' },
            ]}
            value={value ? value.value : null}
            onChange={(_value, option) => {
              setValue(option);
              setChangeFlex(true);
            }}
          />
        </Stack>
      </Center>
    </Box>
  );
}
