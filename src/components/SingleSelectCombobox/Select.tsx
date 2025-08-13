import { Combobox, InputBase, useCombobox } from '@mantine/core';
import { IconCaretDownFilled } from '@tabler/icons-react';

type SelectableProps = {
  value: string;
  setValue: (val: string) => void;
  data: string[];
  selectedLabel?: string;
  radius?: number | string;
};

export default function Selectable({
  value,
  setValue,
  data: options,
  selectedLabel,
  radius,
}: SelectableProps) {
  const combobox = useCombobox();

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
      styles={{
        dropdown: { padding: 0 },
      }}
    >
      <Combobox.Target>
        <InputBase
          size="xs"
          pointer
          rightSection={<IconCaretDownFilled size={16} color="gray" />}
          onClick={() => {
            combobox.toggleDropdown();
          }}
          value={selectedLabel}
          readOnly
          styles={{
            input: {
              borderColor: 'gray',
              fontSize: 11,
              cursor: 'pointer',
              color: 'gray',
              borderRadius: radius ?? 0,
            },
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.map((item) => (
            <div
              key={item}
              style={{
                borderBottom: '1px solid lightgray',
              }}
            >
              <Combobox.Option
                value={item}
                style={{
                  fontSize: 11,
                  padding: '6px 12px',
                  fontWeight: 300,
                  backgroundColor: value === item ? '#eaf3fc' : 'white',
                }}
              >
                {item}
              </Combobox.Option>
            </div>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
