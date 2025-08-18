import { ActionIcon, Group, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

type PanelHeaderProps = {
  label: string;
  icon?: React.ReactNode;
  closeHandler: () => void;
  expandHandler?: () => void;
};

function PanelHeader({ label, icon, closeHandler, expandHandler }: Readonly<PanelHeaderProps>) {
  return (
    <Group justify="space-between">
      <ActionIcon variant="transparent" color="black" onClick={expandHandler} w="auto">
        <Group justify="center" gap="0px">
          {icon}
          <Text>{label}</Text>
        </Group>
      </ActionIcon>
      <ActionIcon variant="transparent" color="black" onClick={closeHandler}>
        <IconX />
      </ActionIcon>
    </Group>
  );
}

export default PanelHeader;
