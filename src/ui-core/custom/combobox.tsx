import { useState, type Dispatch, type SetStateAction } from 'react';
import { Box, Checkbox, Combobox, InputBase, Text, type TextInputProps } from '@mantine/core';
import { useCombobox } from '@mantine/core';

type OptionsList = {
  label: string;
  value: string;
  disabled?: boolean;
};

type CheckboxData = {
  label: string;
  options: OptionsList[];
  showSubscribe?: boolean;
  isSubscribed?: boolean;
};

interface CustomComboboxProps extends TextInputProps {
  data: CheckboxData[];
  selectedValues: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
}

export function CustomCombobox({
  data,
  selectedValues,
  setSelectedValues,
  placeholder,
  required,
  label,
}: CustomComboboxProps) {
  const [search, setSearch] = useState('');
  const combobox = useCombobox();

  const toggleCheckbox = (val: string) => {
    setSelectedValues((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  };

  return (
    <Combobox store={combobox} onOptionSubmit={toggleCheckbox} withinPortal={false}>
      <Combobox.Target>
        <InputBase
          required={required}
          label={label}
          placeholder={placeholder}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => {
            combobox.toggleDropdown();
          }}
          // onFocus={() => {
          //   combobox.openDropdown();
          // }}
          onBlur={() => {
            combobox.closeDropdown();
          }}
          rightSectionPointerEvents="none"
          rightSection={<Combobox.Chevron />}
        />
      </Combobox.Target>

      <Combobox.Dropdown
        style={{
          position: 'static',
          border: 'none',
          padding: 0,
        }}
      >
        <Combobox.Options style={{ padding: 0 }}>
          {data.map((group) => {
            const filteredOptions = group.options.filter((option) =>
              option.label.toLowerCase().includes(search.toLowerCase()),
            );
            if (filteredOptions.length === 0) return null;

            const showSubscribe = group.showSubscribe && !group.isSubscribed;

            return (
              <Box key={group.label}>
                <Box
                  px="md"
                  py={6}
                  style={{
                    border: '1px solid #DADADA',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text fw={500} size="sm">
                    {group.label}
                  </Text>

                  {showSubscribe && (
                    <Text
                      size="xs"
                      component="a"
                      href="#"
                      td="underline"
                      style={{ whiteSpace: 'nowrap' }}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Subscribe Now
                    </Text>
                  )}
                </Box>

                {filteredOptions.map((item) => {
                  return (
                    <Combobox.Option
                      key={item.value}
                      value={item.value}
                      disabled={showSubscribe}
                      style={{
                        padding: 0,
                        margin: 0,
                        border: '1px solid #DADADA',
                        backgroundColor: 'white',
                      }}
                    >
                      <Box px="sm" py={6}>
                        <Checkbox
                          size="xs"
                          label={item.label}
                          checked={selectedValues.includes(item.value)}
                          readOnly
                          disabled={showSubscribe}
                          styles={{
                            label: {
                              color: 'inherit',
                            },
                            root: { margin: 0, padding: 0 },
                          }}
                          w="100%"
                        />
                      </Box>
                    </Combobox.Option>
                  );
                })}
              </Box>
            );
          })}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
