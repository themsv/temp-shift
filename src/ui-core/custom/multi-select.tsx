import { MultiSelect, Group, type MultiSelectProps, Checkbox, Text } from '@mantine/core';
import type { SetState } from '@app/data/types';

interface CustomMultiSelectProps extends MultiSelectProps {
  value: string[];
  setValue: SetState<string[]>;
}

export function CustomMultiSelect({
  data,
  value,
  setValue,
  label,
  placeholder,
}: CustomMultiSelectProps) {
  const renderSelectOption: MultiSelectProps['renderOption'] = ({ option, checked }) => (
    <Group>
      {/* Note:The onChange is dummy,added to avoid DOM errors.
       The option check events will be handled by MultiSelect's onChange */}
      <Checkbox checked={checked} onChange={() => {}} />
      <Text size="sm">{option.label}</Text>
    </Group>
  );
  return (
    <MultiSelect
      label={label}
      placeholder={placeholder}
      onChange={setValue}
      data={data}
      value={value}
      searchable
      renderOption={renderSelectOption}
      nothingFoundMessage="No matching results"
    />
  );
}
